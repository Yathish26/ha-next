"use client";

import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import Link from 'next/link';

export default function TopStories() {
    const [topStories, setTopStories] = useState([])

    useEffect(() => {
        const fetchTopStories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/blogs/rnd/img/6`, { headers: { 'Content-Type': 'application/json', 'x-code': 'RedNote' } })
                setTopStories(response.data);
            } catch (error) {
                console.error('Error fetching top stories:', error);
            }
        };

        fetchTopStories();
    }, []);

    const generateSlug = useCallback(
        (title) => title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
        []
    );


    return (
        <>
            <div className="flex flex-col font-spartan flex-1 gap-4 my-6">
                <h1 className="font-semibold text-3xl">Top Stories</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
                    {topStories && topStories.map((blog, index) => (
                        <Link key={index} href={`/blog/${generateSlug(blog.title)}/${blog._id}`}>
                            <div className="flex flex-col gap-2">
                                <div className="w-full h-[203px]  rounded-xl">
                                    <img draggable="false" className="w-full h-full rounded-xl object-cover" src={blog.coverImage} alt="Image" />
                                </div>
                                <h2 className="font-semibold text-xl">
                                    {blog.title.length > 100 ? blog.title.substring(0, 100) + '...' : blog.title}
                                </h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
