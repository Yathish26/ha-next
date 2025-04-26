'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Svg from './svg/svgvault';
import { leagueSpartan, breeSerif } from '@/lib/font';

export function Header() {
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [error, setError] = useState(null);
    const [place, setPlace] = useState('');
    const pathname = usePathname();

    const login = pathname === '/login' || pathname === '/register';

    useEffect(() => {
        if (!login && location.lat && location.lon) {
            fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/reverse-geocode?lat=${location.lat}&lon=${location.lon}`)
                .then(response => response.json())
                .then(result => {
                    if (result.features && result.features.length > 0) {
                        setPlace(result.features[0].properties.city || 'Unknown location');
                    }
                })
                .catch(error => console.log('Error fetching location:', error));
        }
    }, [login, location]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (err) => {
                    setError('Unable to retrieve your location');
                    setTimeout(() => {
                        setError('');
                    }, 2000);
                }
            );
        } else {
            setError('Geolocation is not supported by your browser');
        }
    }, []);

    const errorClear = () => error === '';

    return (
        <div className="bg-gray-900 h-fit flex flex-col">
            {login ? <LoginHeader /> : (
                <>
                    <div className="flex flex-col w-full items-center relative">
                        <div className="flex mo:justify-center w-full items-center px-6 py-8 justify-between mo:flex-col">
                            <div className="flex items-center gap-4">
                                <Link href="/" passHref>
                                    <div className="cursor-pointer">
                                        <Svg icon="hirearrivebird" />
                                    </div>
                                </Link>
                                <Link href="/" passHref>
                                    <div className={`${breeSerif.className} text-white text-4xl cursor-pointer`}>Hire Arrive</div>
                                </Link>
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 mo:hidden">
                                <Menus />
                            </div>
                            <div className="hidden mo:block">
                                <Menus />
                            </div>
                            <div className={`${errorClear() ? 'hidden' : ''}`}>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center">
                                        <Svg icon="headerlocation" />
                                        <div className={`text-white ${leagueSpartan.className} text-xl`}>
                                            <h1>{error ? error : place}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Header;

const Menus = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const hasBusiness = typeof window !== 'undefined' ? localStorage.getItem('businessName') || 'No' : 'No';
    const pathname = usePathname();
    const blog = pathname.startsWith('/blog');
    const addblog = pathname === '/blog/addblog';
    const ifBlog = blog || addblog;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const menuItems = [
        {
            to: blog && !addblog ? '/blog' : '/',
            icon: blog && !addblog ? 'blogsnewvariant' : 'headerhome',
            label: blog && !addblog ? 'Blogs' : 'Home'
        },
        {
            to: blog && !addblog ? '/blog/addblog' : '/blog',
            icon: blog && !addblog ? 'baddnewvariant' : 'blogsnewvariant',
            label: blog && !addblog ? 'Add Post' : 'Blogs',
        },
        {
            to: '/jobs',
            icon: 'jobrupeebag',
            label: 'Jobs',
            condition: !ifBlog,
        },
        {
            to: token ? '/user' : '/login',
            icon: token ? 'headerprofile' : 'headerlogin',
            label: token ? 'Profile' : 'Login',
        },
    ];

    const visibleMenuItems = menuItems.filter(({ condition = true }) => condition);

    return (
        <ul
            className="flex mo:bg-gray-900 mo:border-2 mo:opacity-90 mo:border-purple-700 mo:rounded-full mo:z-50 mo:fixed mo:left-1/2 mo:bottom-[1rem] mo:transform mo:-translate-x-1/2 mo:justify-evenly mo:items-center justify-center gap-4 py-4 font-spartan text-lg text-white w-full mo:w-fit mo:px-4 mo:max-w-[90%] mo:transition-all mo:duration-300 mo:ease-in-out"
            style={{
                width: `${visibleMenuItems.length * 90}px`,
                minWidth: 'fit-content',
            }}
        >
            {visibleMenuItems.map(({ to, icon, label }, index) => (
                <Link key={index} href={to} passHref>
                    <div className={`flex flex-col ${leagueSpartan.className} px-2 mo:px-4 py-2 justify-center rounded-xl mo:rounded-full items-center hover:bg-purple-700 cursor-pointer`}>
                        <Svg icon={icon} />
                        <li className="mo:hidden transition-opacity duration-300">{label}</li>
                    </div>
                </Link>
            ))}
        </ul>
    );
};

const LoginHeader = () => {
    return (
        <div className="flex justify-center items-center px-6 py-4">
            <Link href="/" passHref>
                <div className="flex items-center gap-4 cursor-pointer">
                    <Svg icon="hirearrivebird" />
                    <div className="font-bree text-white text-4xl">Hire Arrive</div>
                </div>
            </Link>
        </div>
    );
};
