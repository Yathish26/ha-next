'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Svg from '@/app/parts/svg/svgvault';
import Header from '@/app/parts/Header';
import Footer from '@/app/parts/Footer';

const decryptKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

function decrypt(encryptedData, iv) {
    const key = CryptoJS.enc.Utf8.parse(decryptKey);
    const ivParsed = CryptoJS.enc.Hex.parse(iv);

    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Hex.parse(encryptedData) },
        key,
        { iv: ivParsed, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}

export default function EditProfile() {
    const [user, setUser] = useState({ name: '', email: '', profileImage: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showop, setShowop] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/');
                    return;
                }

                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const decrypted = decrypt(res.data.encryptedData, res.data.iv);
                setUser(decrypted);
            } catch (err) {
                console.error('User fetch error:', err);
            }
        };

        fetchUserData();
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setSuccessMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/user`, user, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data);
            setSuccessMessage('Profile updated successfully!');
            setTimeout(() => {
                router.push('/user');
            }, 500);
        } catch (err) {
            setErrorMessage(err?.response?.data?.message || 'Something went wrong.');
        }
    };

    const handleProfilePic = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/upload-image`, formData);
            setUser({ ...user, profileImage: res.data.imageUrl });
            setSuccessMessage('Profile picture updated!');
        } catch (err) {
            setErrorMessage(err?.response?.data?.message || 'Image upload failed.');
        }
    };

    const handleRemoveProfilePic = async () => {
        try {
            const token = localStorage.getItem('token');
            const updatedUser = { ...user, profileImage: '' };

            await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/user`, updatedUser, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUser(updatedUser);
            setSuccessMessage('Profile picture removed!');
        } catch (err) {
            setErrorMessage(err?.response?.data?.message || 'Failed to remove image.');
        }
    };

    const ProfMenu = () => (
        <div className="w-fit h-fit opacity-95 right-[-117px] top-[40px] flex absolute py-1 px-4 rounded-md text-white flex-col bg-[#171d27]">
            <p onClick={() => document.getElementById('profilePictureInput').click()} className={`py-2 cursor-pointer ${user.profileImage && 'border-b'} border-gray-600`}>Change Image</p>
            {user.profileImage && <p onClick={handleRemoveProfilePic} className="py-2 cursor-pointer">Remove Image</p>}
        </div>
    );

    return (
        <>
        <Header />
            <div onClick={() => setShowop(false)} className="flex-1 py-16 bg-gray-900 flex items-center justify-center">
                <div className="bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full">
                    <h2 className="text-3xl font-semibold text-purple-500 mb-8 text-center">Edit Profile</h2>

                    {successMessage && <p className="text-green-500 mb-4 text-center font-medium">{successMessage}</p>}
                    {errorMessage && <p className="text-red-500 mb-4 text-center font-medium">{errorMessage}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-center">
                                <div className="relative w-32 h-32">
                                    {user.profileImage ? (
                                        <img src={user.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <Svg icon={'nopicsnull'} />
                                    )}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowop(!showop);
                                        }}
                                        type="button"
                                        className="absolute top-0 right-0 bg-purple-500 text-white p-1 rounded-full shadow-md focus:outline-none"
                                    >
                                        <Svg icon={'profimagechange'} />
                                    </button>
                                    {showop && <ProfMenu />}
                                    <input
                                        type="file"
                                        id="profilePictureInput"
                                        name="profilePicture"
                                        accept="image/*"
                                        onChange={handleProfilePic}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-white text-sm font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                required
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your name"
                                maxLength={50}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-white text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                required
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your email"
                                maxLength={100}
                            />
                        </div>

                        <button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg">
                            Update Profile
                        </button>
                    </form>

                    <div className="mt-4">
                        <button
                            onClick={() => router.push('/jobs/user')}
                            className="w-full py-3 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Svg icon="diuebwjw" />
                                <p>Edit Job Profile</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
