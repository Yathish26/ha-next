'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import DataBank from '@/Data/Bank';
import PlainBlog from './Plainblog';
import Svg from '../parts/svg/svgvault';
import Blogfail from './Blogfail';
import Widgets from './Widgets';
import CryptoWidget from './CryptoWidget';
import Header from '../parts/Header';
import Footer from '../parts/Footer';
import { leagueSpartan } from '@/lib/font';
import Loading2 from '../parts/Loading2';


export default function Blog() {
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [popularBlogs, setPopularBlogs] = useState([]);
    const [latestblogs, setLatestBlogs] = useState([]);
    const [topBlogs, setTopBlogs] = useState([]);
    const [home, setHome] = useState(true);
    const [headlines, setHeadlines] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(false);
    const [searchShow, setSearchShow] = useState(false);

    const [financeCat, setFinanceCat] = useState(false);
    const [cryptoCat, setCryptoCat] = useState(false);

    const navigate = useRouter();
    const searchParams = useSearchParams();
    const cache = useRef({});

    const categories = DataBank().blogCategories;

    const category = searchParams.get("category");
    const queryKey = category || 'default';


    const tagquery = () => {
        const category = searchParams.get("category"); // Fix here
        return category ? `&category=${category}` : '';
    };


    const fetchData = async () => {
        setLoading(true);

        if (cache.current[queryKey]) {
            const cachedData = cache.current[queryKey];
            setPopularBlogs(cachedData.popularBlogs);
            setLatestBlogs(cachedData.latestBlogs);
            setTopBlogs(cachedData.topBlogs);
            setHeadlines(cachedData.headlines);
            setRecommended(cachedData.recommended);
            setLoading(false);
            return;
        }

        try {
            const commonParams = tagquery();
            const [popularRes, latestRes] = await Promise.all([
                axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/blogs/popular?count=4${commonParams}`),
                axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/blogs/latest?count=4${commonParams}`)
            ]);

            setPopularBlogs(popularRes.data);
            setLatestBlogs(latestRes.data);

            const [topStoriesRes, headlinesRes, recommendedRes] = await Promise.all([
                axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/blogs/rnd/img/6`, { headers: { 'Content-Type': 'application/json', 'x-code': 'RedNote' } }),
                axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/blogs/rnd/img/1`, { headers: { 'Content-Type': 'application/json', 'x-code': 'RedNote' } }),
                axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/blogs/rnd/img/4`, { headers: { 'Content-Type': 'application/json', 'x-code': 'RedNote' } })
            ]);

            setTopBlogs(topStoriesRes.data);
            setHeadlines(headlinesRes.data);
            setRecommended(recommendedRes.data);

            cache.current[queryKey] = {
                popularBlogs: popularRes.data,
                latestBlogs: latestRes.data,
                topBlogs: topStoriesRes.data,
                headlines: headlinesRes.data,
                recommended: recommendedRes.data
            };

        } catch (error) {
            setError(true)
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {

        if (cache.current[queryKey]) {
            const cachedData = cache.current[queryKey];
            setPopularBlogs(cachedData.popularBlogs);
            setLatestBlogs(cachedData.latestBlogs);
            setTopBlogs(cachedData.topBlogs);
            setHeadlines(cachedData.headlines);
            setRecommended(cachedData.recommended);
            setHome(category ? false : true);
            setSelectedCategory(category || null);
            setLoading(false);
        } else {
            fetchData();
        }
    }, [searchParams]);


    const generateSlug = useCallback(
        (title) => title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
        []
    );


    const handleCategoryClick = async (category) => {
        setLoading(true);
        setSelectedCategory(category);
        if (category === "Latest") {
            setHome(true);
            navigate.push(`/blog`);
        } else {
            setHome(false);
            navigate.push(`/blog?category=${category.toLowerCase()}`);
        }
    };


    const searchQuery = (e) => {
        e.preventDefault();
        let script = e.target.value;
        if (script.trim().length > 0) {
            setSearchLoading(true);
            setSearchShow(true);
        }

        if (script.trim().length === 0) {
            setSearchLoading(false);
            setSearchShow(false);
        }
        setSearch(script);
    };

    const searchResponse = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/blogs/search?query=${search}`);
            setSearchResults(response.data);
        } catch (error) {
            setSearchError(true);
        } finally {
            setSearchLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (search.trim().length > 1) {
                setSearchShow(true);
                searchResponse();
            } else {
                setSearchError(false);
                setSearchShow(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search]);



    const searchIcons = () => {
        if (search.trim().length === 0) return <Svg icon="smob" />;
        return (
            <div className='cursor-pointer' onClick={() => setSearch('')}>
                <Svg icon="smobcross" />
            </div>
        )
    };

    const searchIconM = () => {
        if (search.trim().length === 0) return <Svg icon="sqs" />;
        return (
            <div className='cursor-pointer' onClick={() => setSearch('')}>
                <Svg icon="sqscross" />
            </div>
        )
    };

    useEffect(() => {
        switch (selectedCategory) {
            case "Finance":
                setFinanceCat(true);
                setCryptoCat(false);
                break;
            case "Cryptocurrency":
                setCryptoCat(true);
                setFinanceCat(false);
                break;
            default:
                setFinanceCat(false);
                setCryptoCat(false);
        }
    }, [selectedCategory])



    const TopBlog = () => {

        const topBlog = headlines[0];
        if (headlines[0].length === 0) return <p>No blogs available</p>;

        const descriptionWithImage = topBlog.description.match(/<img [^>]*src="([^"]+)"/);
        const firstImageUrl = descriptionWithImage ? descriptionWithImage[1] : null;
        const iscoverImage = topBlog.coverImage || firstImageUrl

        return (
            <div
                className={`max-w-[580px] w-full ${iscoverImage ? 'p-10' : ''} rounded-3xl relative`}
                style={{ backgroundImage: `url(${iscoverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                {iscoverImage && <div className="absolute inset-0 bg-black opacity-30 rounded-3xl"></div>}

                <div className='flex gap-2 items-center relative z-10'>
                    <p className={`text-sm font-semibold ${iscoverImage ? 'text-yellow-500' : 'text-blue-500'} relative`} style={{ textShadow: iscoverImage ? '1px 1px 3px rgba(0, 0, 0, 0.7)' : 'none' }}>
                        {topBlog.category}
                    </p>
                    <p className={`text-sm font-semibold ${iscoverImage ? 'text-white' : 'text-gray-500'} relative`} style={{ textShadow: iscoverImage ? '1px 1px 3px rgba(0, 0, 0, 0.7)' : 'none' }}>•</p>
                    <p className={`text-sm font-semibold ${iscoverImage ? 'text-white' : 'text-gray-500'} relative`} style={{ textShadow: iscoverImage ? '1px 1px 3px rgba(0, 0, 0, 0.7)' : 'none' }}>
                        {new Date(topBlog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
                    </p>
                </div>

                <div className={`w-full max-w-[580px] drop-shadow-xl ${iscoverImage ? 'text-white' : 'text-black'} h-auto mt-8 text-4xl font-semibold relative z-10`} style={{ textShadow: iscoverImage ? '2px 2px 4px rgba(0, 0, 0, 0.7)' : 'none' }}>
                    {topBlog.title.length > 50 ? topBlog.title.substring(0, 50) + '...' : topBlog.title}
                </div>

                <Link href={`/blog/${generateSlug(topBlog.title)}-${topBlog._id}`} >
                    <button className='w-fit h-fit py-4 px-6 mt-7 bg-white rounded-3xl flex justify-center text-xl items-center gap-2 font-semibold relative z-10'>
                        Read Article
                        <Svg icon='rarr' />
                    </button>
                </Link>
            </div>
        );
    };



    const PopularTile = () => {
        return (
            <div>
                <h1 className='text-[2rem] font-semibold my-6'>Popular</h1>
                <div className='w-full h-full  mo:mt-4 grid gap-2 grid-cols-2'>
                    {popularBlogs.map((blog, id) => {
                        const descriptionWithImage = blog.description.match(/<img [^>]*src="([^"]+)"/);
                        const firstImageUrl = descriptionWithImage ? descriptionWithImage[1] : null;
                        const postImage = blog.coverImage || firstImageUrl
                        let titlelen = () => {
                            if (postImage) {
                                return 25
                            } else {
                                return 40
                            }
                        }

                        return (
                            <Link key={id} href={`/blog/${generateSlug(blog.title)}-${blog._id}`}>
                                <div className="flex flex-col items-start gap-3">
                                    <div className="flex gap-2 mt-4 items-center">
                                        <p className="text-sm font-semibold text-[#202EFC]">{blog.category}</p>
                                        <p className="text-sm font-semibold text-[#A0A1A8] mo:text-[#59595b]">•</p>
                                        <p className="text-sm font-semibold text-[#A0A1A8] mo:text-[#59595b]">
                                            {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
                                        </p>
                                    </div>
                                    <div className='flex gap-4 items-start'>
                                        <div className="w-fit flex flex-col">
                                            <div className={`${!postImage ? "w-full" : "w-56"} h-fit text-xl font-semibold`}>
                                                {blog.title.length > titlelen ? blog.title.substring(0, titlelen) + '...' : blog.title}
                                            </div>
                                            <PlainBlog tcss={`${!postImage ? "w-full" : "w-56"} h-fit text-base`} content={blog.description.length > 70 ? blog.description.substring(0, 70) + '...' : blog.description} />
                                        </div>

                                        {(postImage) && (
                                            <img
                                                draggable="false"
                                                src={postImage}
                                                className="w-[100px] h-[83px] rounded-xl object-contain"
                                                alt="Image"
                                            />
                                        )}
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }


    const LatestTile = () => {
        return (
            <div>
                <h1 className='text-[2rem] font-semibold my-6'>Latest</h1>
                <div className='w-full h-full  mo:mt-16 grid gap-2 grid-cols-2'>
                    {(latestblogs)
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((blog, id) => {
                            const descriptionWithImage = blog.description.match(/<img [^>]*src="([^"]+)"/);
                            const firstImageUrl = descriptionWithImage ? descriptionWithImage[1] : null;
                            const postImage = blog.coverImage || firstImageUrl
                            let titlelen = () => {
                                if (postImage) {
                                    return 25
                                } else {
                                    return 40
                                }
                            }

                            return (
                                <Link key={id} href={`/blog/${generateSlug(blog.title)}-${blog._id}`}>
                                    <div className="flex flex-col items-start gap-3">
                                        <div className="flex gap-2 mt-4 items-center">
                                            <p className="text-sm font-semibold text-[#202EFC]">{blog.category}</p>
                                            <p className="text-sm font-semibold text-[#A0A1A8] mo:text-[#59595b]">•</p>
                                            <p className="text-sm font-semibold text-[#A0A1A8] mo:text-[#59595b]">
                                                {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
                                            </p>
                                        </div>
                                        <div className='flex gap-4 items-start'>
                                            <div className="w-fit h-fit flex flex-col">

                                                <div className={`${!postImage ? "w-full" : "w-56"} h-fit text-xl font-semibold`}>
                                                    {blog.title.length > titlelen ? blog.title.substring(0, titlelen) + '...' : blog.title}
                                                </div>
                                                <PlainBlog tcss={`${!postImage ? "w-full" : "w-56"} h-fit text-base`} content={blog.description.length > 70 ? blog.description.substring(0, 70) + '...' : blog.description} />
                                            </div>

                                            {(blog.coverImage || firstImageUrl) && (
                                                <img
                                                    draggable="false"
                                                    src={blog.coverImage || firstImageUrl}
                                                    className="w-[100px] h-[83px] rounded-xl object-contain"
                                                    alt="Image"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </div>
        )
    }


    const NoSearchRes = () => {
        return (
            <div className={`flex flex-col w-full mo:w-full h-fit items-center justify-center ${searchShow ? "block" : "hidden"} mt-12 p-8 `}>
                <img draggable="false" className="w-20 h-20 mo:w-12 mo:h-12 mb-6 text-gray-400" src="/logos/no-result.svg" alt="No Result" />
                <p className="text-2xl text-gray-800 font-bold mb-2">No results found</p>
                <p className="text-gray-600 text-center max-w-md">
                    We couldn’t find any matches for
                    <span className="font-semibold text-gray-800"> "{search}"</span>.
                    Please try again with a different keyword.
                </p>
            </div>
        )
    }


    const SearchTile = () => {
        if (searchLoading) {
            return (
                <div className="flex flex-col w-full mo:w-full h-fit items-center justify-center mt-12 p-8">
                    <Loading2 />
                </div>
            )
        }
        return (
            <div className={`${searchShow ? "block" : "hidden"} mo:p-7 w-full  mo:w-full h-fit`}>
                <h1 className='text-[2rem] font-semibold my-6'>Results for "{search}"</h1>
                <div className='w-full h-full  mo:mt-16 grid gap-2 grid-cols-2'>
                    {(searchResults)
                        .map((blog, id) => {
                            const descriptionWithImage = blog.description.match(/<img [^>]*src="([^"]+)"/);
                            const firstImageUrl = descriptionWithImage ? descriptionWithImage[1] : null;
                            const postImage = blog.coverImage || firstImageUrl
                            let titlelen = () => {
                                if (postImage) {
                                    return 25
                                } else {
                                    return 40
                                }
                            }

                            return (
                                <Link key={id} href={`/blog/${generateSlug(blog.title)}-${blog._id}`}>
                                    <div className="flex flex-col items-start gap-3">
                                        <div className="flex gap-2 mt-4 items-center">
                                            <p className="text-sm font-semibold text-[#202EFC]">{blog.category}</p>
                                            <p className="text-sm font-semibold text-[#A0A1A8] mo:text-[#59595b]">•</p>
                                            <p className="text-sm font-semibold text-[#A0A1A8] mo:text-[#59595b]">
                                                {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
                                            </p>
                                        </div>
                                        <div className='flex gap-4 items-start'>
                                            <div className="w-fit h-fit flex flex-col">

                                                <div className={`${!postImage ? "w-full" : "w-56"} h-fit text-xl font-semibold`}>
                                                    {blog.title.length > titlelen ? blog.title.substring(0, titlelen) + '...' : blog.title}
                                                </div>
                                                <PlainBlog tcss={`${!postImage ? "w-full" : "w-56"} h-fit text-base`} content={blog.description.length > 70 ? blog.description.substring(0, 70) + '...' : blog.description} />
                                            </div>

                                            {(blog.coverImage || firstImageUrl) && (
                                                <img
                                                    draggable="false"
                                                    src={blog.coverImage || firstImageUrl}
                                                    className="w-[100px] h-[83px] rounded-xl object-contain"
                                                    alt="Image"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </div>
        )
    }

    return (
        <>
            <Header />
            <div className={`bg-[#F4DCFF] w-full mo:bg-[#eacfff] ${leagueSpartan.className} px-7 mo:px-0 flex-1 flex justify-center ${error ? "items-center" : ''}`} >
                {error && <Blogfail />}
                {!error &&
                    <>
                        <div className={`mo:hidden ${searchShow ? 'w-[60%]' : ''} block`}>
                            {searchResults && !searchError && <SearchTile />}
                            {searchError && <NoSearchRes />}
                        </div>

                        <div className={`w-[60%] ${searchShow ? "hidden mo:block" : "block"} mo:w-full h-fit`} >
                            <div className={`flex  my-7 mo:px-7 w-3/4 mo:w-full gap-5 overflow-hidden overflow-x-scroll hide-scrollbar`}>
                                <a href="/blog">
                                    <div onClick={() => handleCategoryClick("Latest")} className='w-fit mo:border mo:border-purple-500 cursor-pointer h-fit py-2 px-4 flex justify-center items-center gap-[10px] rounded-3xl bg-white'>
                                        <Svg icon="cube" />
                                        <div className={`${home ? 'font-semibold' : ''}`}>Latest</div>
                                    </div>
                                </a>
                                {categories.map((category, id) => (
                                    <div
                                        key={id}
                                        onClick={() => handleCategoryClick(category)}
                                        className={`w-fit cursor-pointer mo:border mo:border-purple-500 h-fit py-2 px-4 rounded-3xl bg-white ${selectedCategory === category ? 'font-semibold' : 'font-normal'
                                            }`}
                                    >
                                        {category}
                                    </div>
                                ))}
                            </div>
                            <div className={`hidden mo:block`}>
                                <div className='flex w-full justify-center items-center'>
                                    <div className="relative flex justify-center items-center max-w-60 ">
                                        <input className='w-fit px-4 py-2 pr-12 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500'
                                            name="search"
                                            value={search}
                                            onChange={(e) => searchQuery(e)}
                                            type="text"
                                            placeholder="Search for Articles"
                                        />
                                        {searchIconM()}
                                    </div>
                                </div>
                            </div>

                            <div className='mo:block hidden'>
                                {searchResults && !searchError && <SearchTile />}
                                {searchError && <NoSearchRes />}
                            </div>

                            <div className={`mo:px-7 ${searchShow ? "hidden" : "block"}`}>
                                {<Svg icon='bestweek' />}
                                {loading ? <BlogShimmer /> : <>
                                    <TopBlog />
                                    <div className='mt-20'>
                                        {financeCat && <Widgets />}
                                        {cryptoCat && <CryptoWidget />}
                                        <PopularTile />
                                        <LatestTile />
                                        {/* <OuterContent category={role()}/> */}
                                    </div>
                                    <div className="flex flex-col gap-4 my-6">
                                        <h1 className="font-semibold text-[24px]">Top Stories</h1>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
                                            {topBlogs && topBlogs.map((blog, index) => (
                                                <Link key={index} href={`/blog/${generateSlug(blog.title)}-${blog._id}`}>
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
                                </>}
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <div className='w-fit h-fit mo:hidden bg-white rounded-xl flex flex-col justify-center items-center my-6'>
                                <div className='w-96 h-10 rounded-xl m-4 bg-gray-200 flex justify-between px-4 items-center'>
                                    <input type="text" name="search" value={search} onChange={(e) => searchQuery(e)} className='bg-gray-200 focus:outline-none' placeholder='Article Search' ></input>
                                    {searchIcons()}
                                </div>

                                <div className='flex w-full justify-between p-4'>
                                    <h1 className='text-xl font-semibold'>Recommended</h1>
                                    {/* <div className='flex gap-2 items-center'>
                                        <h1 className='text-sm font-semibold'>View All</h1>
                                        <Svg icon='rightarrow' />
                                    </div> */}
                                </div>
                                {/* <div className='w-96 h-28 m-4 bg-gray-400 rounded-xl'></div> */}
                                {loading ? <RecommendedShimmer /> : (recommended
                                    .map((blog, id) => {
                                        const descriptionWithImage = blog.description.match(/<img [^>]*src="([^"]+)"/);
                                        const firstImageUrl = descriptionWithImage ? descriptionWithImage[1] : null;

                                        return (
                                            <div key={id}>
                                                <Link href={`/blog/${generateSlug(blog.title)}-${blog._id}`}>
                                                    <div className="w-96 min-h-32 max-h-fit py-2 cursor-pointer flex justify-between items-center">
                                                        <div className="w-[212px] h-fit">
                                                            <div className="text-sm gap-2 flex rounded-xl">
                                                                <h1 className="text-[#202EFC] text-sm font-semibold">{blog.category}</h1>
                                                                <p className="text-gray-500">•</p>
                                                                <p className="text-gray-500 font-semibold">
                                                                    {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
                                                                </p>
                                                            </div>
                                                            <p className="font-semibold text-lg">
                                                                {blog.title.length > 100 ? `${blog.title.slice(0, 100)}...` : blog.title}
                                                            </p>
                                                        </div>

                                                        {(blog.coverImage || firstImageUrl) && (
                                                            <img
                                                                draggable="false"
                                                                src={blog.coverImage || firstImageUrl}
                                                                alt="Image"
                                                                className="w-[89px] h-[85px] rounded-xl object-contain"
                                                            />
                                                        )}
                                                    </div>
                                                </Link>

                                                {id !== recommended.length - 1 && (
                                                    <div className="w-96 h-[1px] my-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
                                                )}
                                            </div>
                                        );
                                    }))}
                            </div>
                            {/* <div className="relative w-full border mo:hidden border-gray-200 rounded-lg">
                                <div className="text-xs text-gray-500 p-2 bg-gray-50 border-b border-gray-200 rounded-t-lg">
                                    Advertisement
                                </div>
                                <div className="p-4">
                                    <GoogleAds />
                                </div>
                            </div> */}
                        </div>
                    </>}
            </div >
            <Footer />
        </>

    );
}





const BlogShimmer = () => {
    return (
        <>
            <div className='flex flex-col w-full mo:mb-4'>
                <div className="flex w-full flex-col items-start">
                    <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gradient-to-r from-purple-400 to-purple-300"></div>
                    <div className="mb-2 h-4 w-1/2 animate-pulse rounded bg-gradient-to-r from-purple-400 to-purple-300"></div>
                    <div className="mb-2 h-4 w-1/2 animate-pulse rounded bg-gradient-to-r from-purple-400 to-purple-300"></div>
                    <div className="mb-4 h-4 w-32 animate-pulse rounded bg-gradient-to-r from-purple-400 to-purple-300"></div>
                </div>
                <div className="mt-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {[1, 2].map((_, index) => (
                            <div key={index} className="flex animate-pulse items-start gap-4">
                                <div className="flex flex-col gap-2">
                                    <div className="h-4 w-32 rounded bg-gradient-to-r from-purple-400 to-purple-300"></div>
                                    <div className="h-4 w-40 rounded bg-gradient-to-r from-purple-400 to-purple-300"></div>
                                    <div className="h-4 w-60 rounded bg-gradient-to-r from-purple-400 to-purple-300"></div>
                                </div>
                                <div className="h-16 w-16 rounded-lg bg-gradient-to-r from-purple-400 to-purple-300"></div>
                            </div>)
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}

const RecommendedShimmer = () => {
    return (
        <>
            <div className="flex max-h-fit min-h-32 w-96 animate-pulse cursor-pointer items-center justify-between py-2">
                <div className="h-fit w-[212px]">
                    <div className="flex flex-col gap-3 rounded-xl">
                        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                        <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                    </div>
                </div>
                <div className="h-[85px] w-[89px] rounded-xl bg-gray-200"></div>
            </div>
            <div className="flex max-h-fit min-h-32 w-96 animate-pulse cursor-pointer items-center justify-between py-2">
                <div className="h-fit w-[212px]">
                    <div className="flex flex-col gap-3 rounded-xl">
                        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                        <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                    </div>
                </div>
                <div className="h-[85px] w-[89px] rounded-xl bg-gray-200"></div>
            </div>
            <div className="flex max-h-fit min-h-32 w-96 animate-pulse cursor-pointer items-center justify-between py-2">
                <div className="h-fit w-[212px]">
                    <div className="flex flex-col gap-3 rounded-xl">
                        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                        <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                    </div>
                </div>
                <div className="h-[85px] w-[89px] rounded-xl bg-gray-200"></div>
            </div>
            <div className="flex max-h-fit min-h-32 w-96 animate-pulse cursor-pointer items-center justify-between py-2">
                <div className="h-fit w-[212px]">
                    <div className="flex flex-col gap-3 rounded-xl">
                        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                        <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                    </div>
                </div>
                <div className="h-[85px] w-[89px] rounded-xl bg-gray-200"></div>
            </div>
        </>
    )
}