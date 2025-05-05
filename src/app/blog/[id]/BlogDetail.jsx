"use client";
import { formatDistanceToNow } from 'date-fns';
import Svg from '@/app/parts/svg/svgvault';
import { useEffect, useState } from 'react';
import { leagueSpartan } from '@/lib/font';
import Alert from '@/app/parts/Alert';

export default function BlogContent({ post }) {
    const imageUrl = post.coverImage;
    const profileImage = post.userId?.profileImage || "/default-profile.png";
    const authorName = post.userId?.name || "Unknown Author";
    const createdAt = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })

    const [showshare, setShowShare] = useState(false);
    const [showalert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');

    const [url, setUrl] = useState('');
    const [pageTitle, setPageTitle] = useState('');

    useEffect(() => {
        setUrl(window.location.href);
        setPageTitle(document.title);
    }, []);

    const closeAlert = () => {
        setShowAlert(false);
    };

    const tweetClick = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(pageTitle)}%0A%0APosted%20by%20${post.userId.name}%20at%20@HireArrive%0A%0A`;

        window.open(twitterUrl, '_blank');
    }

    const threadsClick = () => {
        const threadsUrl = `https://www.threads.net/intent/post/?text=${encodeURIComponent(pageTitle)}%0A%0A${encodeURIComponent(url)}`;
        window.open(threadsUrl, '_blank');
    }

    const whatsappClick = () => {
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(pageTitle)}%0A%0A${encodeURIComponent(url)}`;
        window.open(whatsappUrl, '_blank');
    };

    const redditClick = () => {
        const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(pageTitle)}`;
        window.open(redditUrl, '_blank');
    };

    const copyLink = () => {
        navigator.clipboard.writeText(url);
        setShowAlert(true);
        setMessage('Link copied to clipboard!');
    }

    const handleShareClick = (e) => {
        if (showshare) {
            setShowShare(false);
            return;
        }
        setShowShare(true);
        e.stopPropagation()
    }

    const handleScreenclick = () => {
        setShowShare(false);
      };

    const SharePortal = () => (
        <div className='w-fit absolute right-[-15px] opacity-90 bottom-[-265px] h-fit py-4 px-3 bg-[#e6e6e6] flex flex-col gap-4 justify-center items-center rounded'>
            <div onClick={tweetClick}><Svg icon={'bdXicon'} /></div>
            <div onClick={threadsClick}><Svg icon={'bdthreads'} /></div>
            <div onClick={whatsappClick}><Svg icon={'bdwhatsapp'} /></div>
            <div onClick={redditClick}><Svg icon={'bdreddit'} /></div>
            <div onClick={copyLink}><Svg icon={'bdcopylink'} /></div>
        </div>
    );

    return (
        <>
            {showalert && <Alert message={message} onClose={closeAlert} />}
            <div onClick={handleScreenclick} className="flex-1 flex flex-col px-[25%] mo:px-7 mo:py-10 pb-10 pt-10 bg-gradient-to-b from-[#FFF2FF] to-[#F4DCFF]">
                <div className='w-full flex justify-end relative gap-4 py-2' >
                    <div>
                        <div className='cursor-pointer' onClick={handleShareClick}>
                            <Svg icon={'bdetailshare'} />
                        </div>
                        {showshare && <SharePortal />}
                    </div>
                </div>

                <h1 className={`text-5xl mo:text-4xl py-3 mb-3 ${leagueSpartan.className} font-semibold  break-words overflow-hidden`}>{post.title}</h1>
                <div className="flex items-center mb-4">
                    <img src={profileImage} alt={authorName} className="w-10 h-10 rounded-full mr-2" />
                    <div>
                        <p className="text-gray-700 font-semibold">{authorName}</p>
                        <div className="flex items-center">
                            <p className="text-purple-600 font-semibold text-sm mr-2">{post.category}</p>
                            <p className="text-gray-500 text-sm">{createdAt}</p>
                        </div>
                    </div>
                </div>
                {post.coverImage && <img src={imageUrl} alt={post.title} className="w-full rounded-lg mb-4" />}

                <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: post.description || "" }} />
            </div >
        </>
    );
}

