'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Link from 'next/link';
import Svg from '../parts/svg/svgvault';
import Header from '../parts/Header';
import Footer from '../parts/Footer';
import { leagueSpartan } from '@/lib/font';

const decryptKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

function decrypt(encryptedData, iv) {
    const key = CryptoJS.enc.Utf8.parse(decryptKey);
    const ivParsed = CryptoJS.enc.Hex.parse(iv);

    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Hex.parse(encryptedData) },
        key,
        {
            iv: ivParsed,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );

    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [business, setBusiness] = useState('');
    const router = useRouter();

    const hasbusiness = Boolean(business);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error('User fetch failed');

                const data = await res.json();
                const decrypted = decrypt(data.encryptedData, data.iv);
                setUser(decrypted);
                setBusiness(decrypted.businessName);
            } catch (error) {
                console.error('Error:', error);
                router.push('/login');
            }
        };

        fetchUserData();
    }, [router]);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/logout`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (err) {
            console.error(err);
        } finally {
            localStorage.removeItem('token');
            router.push('/');
        }
    };

    return (
        <>
            <Header />
            <div className={`flex-1 bg-gray-900 flex flex-col items-center justify-center`}>
                {/* Mobile View */}
                <div className='hidden mo:block'>
                    <div className='flex flex-col mt-8 items-center justify-center'>
                        <div className='w-48 h-48 mb-4 bg-gray-700 rounded-full flex justify-center items-center border-4 border-purple-700'>
                            {user?.profileImage ? (
                                <img draggable="false" src={user.profileImage} className="w-36 h-36 object-cover rounded-full" alt="Profile Image" />
                            ) : (
                                <Svg icon="onfwe" className="w-36 h-36" />
                            )}
                        </div>
                        {user?.name && <div className='text-white font-semibold text-4xl m-4 mb-2'>{user.name}</div>}
                        {user?.workcategory && (
                            <div className='w-fit px-4 h-[34px] gap-1 bg-[#452A5C] border-2 border-purple-700 rounded-3xl flex justify-center items-center m-4 mt-2'>
                                <Svg icon='toyssfn' />
                                <div className='text-sm font-bold text-white'>{user.workcategory}</div>
                            </div>
                        )}
                        <div className='flex flex-col justify-center items-center gap-2'>
                            {user?.bio && <div className='text-gray-400 text-xl'>{user.bio}</div>}
                            {user?.email && <div className='text-gray-400 text-xl'>{user.email}</div>}
                            {user?.phoneNumber && (
                                <div className='text-gray-400 text-xl flex gap-2 items-center justify-center'>
                                    <Svg icon='callrinferb' />
                                    <p>{user.phoneNumber}</p>
                                </div>
                            )}
                            {user?.location && (
                                <div className='text-gray-400 text-xl flex gap-2 items-center justify-center'>
                                    <Svg icon='lojfbew' />
                                    <p>{user.location}</p>
                                </div>
                            )}
                        </div>

                        <div className='my-9 flex flex-col justify-center items-center gap-7 '>
                            <Link href="/user/editprofile">
                                <div className='bg-purple-700 text-white font-semibold flex py-2 gap-2 px-4 rounded-3xl'>
                                    <Svg icon='newediticonmobile' />
                                    <p className='text-md'>Edit Profile</p>
                                </div>
                            </Link>
                            <Link href={hasbusiness ? '/business' : '/free-listing'}>
                                <div className='bg-purple-700 text-white font-semibold flex py-2 gap-2 px-8 rounded-3xl'>
                                    <Svg icon='uprofilebusiness' />
                                    <p className='text-md'>{hasbusiness ? 'My Business' : 'List Your Business'}</p>
                                </div>
                            </Link>
                            <Link href="/blog/user">
                                <div className='bg-purple-700 text-white font-semibold flex py-2 gap-2 px-6 rounded-3xl'>
                                    <Svg icon='blogsnewvariant' className="w-6 h-6" />
                                    <p className='text-md'>My Blogs</p>
                                </div>
                            </Link>
                            <div onClick={handleLogout} className='cursor-pointer bg-purple-950 hover:bg-red-900 text-white font-semibold flex py-2 gap-2 px-4 rounded-3xl'>
                                <Svg icon='lognowefi' />
                                <p className='text-md'>Logout</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PC View */}
                <div className={`pt-6 pb-24 w-full mo:hidden`}>
                    <div className='flex justify-end px-16'>
                        <div onClick={handleLogout} className='cursor-pointer bg-purple-950 hover:bg-red-900 text-white font-semibold flex py-2 gap-2 px-6 rounded-3xl'>
                            <Svg icon='ldonfien' />
                            <p className='text-xl'>Logout</p>
                        </div>
                    </div>
                    <div className={`flex justify-center ${leagueSpartan.className} items-center`}>
                        <div className='w-[711px] h-[356px] bg-gradient-to-b from-[#090C14] to-[#111827] flex flex-col justify-center items-center rounded-3xl'>
                            <div className='flex w-full justify-end pr-[19px] pt-[16px]'>
                                <Link href='/user/editprofile'>
                                    <div className='w-fit h-fit p-3 bg-purple-700 rounded-full flex justify-center items-center'>
                                        <Svg icon='newediticon' />
                                    </div>
                                </Link>
                            </div>
                            <div className='w-full h-full flex'>
                                <div className='w-1/2 flex flex-col justify-center items-center'>
                                    <div className='w-36 h-36 mb-4 bg-gray-700 rounded-full flex justify-center items-center border-4 border-purple-700'>
                                        {user?.profileImage ? (
                                            <img draggable="false" src={user.profileImage} className="w-28 h-28 object-cover rounded-full" alt="Profile Image" />
                                        ) : (
                                            <Svg icon='onfwe' />
                                        )}
                                    </div>
                                    {user?.workcategory && (
                                        <div className='w-fit px-6 h-[34px] gap-2 bg-[#452A5C] border-2 border-purple-700 rounded-3xl flex justify-center items-center'>
                                            <Svg icon='toyssfn' />
                                            <div className='text-sm font-bold text-white'>{user.workcategory}</div>
                                        </div>
                                    )}
                                </div>
                                <div className='w-1/2 flex flex-col justify-center gap-3 pl-4'>
                                    {user?.name && <h2 className='text-white text-3xl font-semibold'>{user.name}</h2>}
                                    {user?.bio && <p className='text-gray-400'>{user.bio}</p>}
                                    {user?.email && <p className='text-gray-400'>{user.email}</p>}
                                    {user?.phoneNumber && (
                                        <div className='text-gray-400 flex gap-2 items-center'>
                                            <Svg icon='callrinferb' />
                                            <p>{user.phoneNumber}</p>
                                        </div>
                                    )}
                                    {user?.location && (
                                        <div className='text-gray-400 flex gap-2 items-center'>
                                            <Svg icon='lojfbew' />
                                            <p>{user.location}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center gap-4'>
                        <div className='flex justify-center items-center'>
                            <Link href={'/blog/user'}>
                                <div className='bg-purple-700 justify-center items-center text-white font-semibold flex py-2 gap-2 px-6 rounded-3xl'>
                                    <Svg icon={'blogsnewvariant'} tcss={'w-6 h-6'} />
                                    <p className='text-lg'>My Blogs</p>
                                </div>
                            </Link>
                        </div>

                        <div className='flex justify-center items-center'>
                            <Link href={`${hasbusiness ? `/business` : '/free-listing'}`}>
                                <div className='bg-purple-700 justify-center items-center  text-white font-semibold flex py-2 gap-2 px-6 rounded-3xl'>
                                    <Svg icon={'uprofilebusiness'} tcss={'w-6 h-6'} />
                                    <p className='font-semibold text-lg'>{hasbusiness ? 'My Business' : 'List Your Business'}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
