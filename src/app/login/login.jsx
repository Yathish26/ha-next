'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import GoogleSignIn from '../parts/GoogleSignIn';
import CryptoJS from 'crypto-js';
import { leagueSpartan } from '@/lib/font';
import LoginHeader from '../parts/LoginHeader';

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

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/login`, {
                email,
                password,
            });

            const { token } = response.data;

            localStorage.setItem('token', token);

            const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/user`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const decryptedData = decrypt(userResponse.data.encryptedData, userResponse.data.iv);

            const hasBusiness = decryptedData?.hasBusiness ?? false;

            localStorage.setItem('businessName', hasBusiness ? 'Yes' : 'No');

            router.push('/');
        } catch (error) {
            console.error('Login Error:', error);
        
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || 'Username or password is incorrect');
            } else if (error.request) {
                setErrorMessage('No response from server. Please check your network or try again later.');
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        }        
    };

    const handleGoogleSignInSuccess = async (credentialResponse) => {
        try {
            const { credential } = credentialResponse;

            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/login/google`, {
                tokenId: credential,
            });

            const { token } = response.data;

            localStorage.setItem('token', token);

            const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/user`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const decryptedData = decrypt(userResponse.data.encryptedData, userResponse.data.iv);

            const hasBusiness = decryptedData?.hasBusiness ?? false;

            localStorage.setItem('businessName', hasBusiness ? 'Yes' : 'No');

            router.push('/');
        } catch (error) {
            setErrorMessage('Google sign-in failed. Please try again.');
            console.error('Google Sign-In Error:', error);
        }
    };

    const handleGoogleSignInFailure = (error) => {
        setErrorMessage('Google sign-in failed. Please try again.');
        console.error('Google Sign-In Error:', error);
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <LoginHeader />
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-900">
                <div className={`w-full max-w-sm m-4 ${leagueSpartan.className} bg-gray-800 shadow-[#18032b] p-8 rounded-3xl shadow-2xl`}>
                    <h1 className="text-3xl font-bold text-center text-[#AE00F9] mb-6">Login</h1>
                    {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                    <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
                        <div>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 bg-gray-700 text-white border border-transparent rounded-lg focus:outline-none focus:border-purple-700"
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-3 py-2 bg-gray-700 text-white border border-transparent rounded-lg focus:outline-none focus:border-purple-700"
                            />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <button
                                type="submit"
                                className="w-full py-2 bg-[#AE00F9] hover:bg-purple-800 text-white font-bold rounded-lg transition duration-300"
                            >
                                Sign In
                            </button>
                            <div className='flex justify-center'>
                                <GoogleSignIn onSuccess={handleGoogleSignInSuccess} onFailure={handleGoogleSignInFailure} />
                            </div>
                        </div>
                    </form>
                    <div className='w-full flex justify-center'>
                        <Link href="/register">
                            <button className='bg-gray-700 rounded-lg py-2 px-6 w-full text-center text-white mt-3 hover:bg-purple-800 cursor-pointer'>
                                Create Account
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
