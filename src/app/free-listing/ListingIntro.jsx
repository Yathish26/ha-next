'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { leagueSpartan } from '@/lib/font';
import Header from '../parts/Header';
import Footer from '../parts/Footer';

export const metadata = {
    title: 'Free Listing - Hire Arrive',
};

export default function ListingIntro() {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();
  const [businessToken, setBusinessToken] = useState(false);

  useEffect(() => {
    // Access localStorage only on the client
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('businessName') === 'Yes';
      setBusinessToken(token);
      if (token) {
        router.push('/business');
      }
    }
    window.scrollTo(0, 0);
  }, [router]);

  return (
    <>
    <Header />
    <div className={`bg-gray-900 ${leagueSpartan.className} text-white flex-1 flex flex-col items-center justify-center p-6`}>
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8 rounded-3xl shadow-xl max-w-2xl w-full">
        <h1 className="text-4xl font-semibold text-purple-500 mb-6 text-center">
          List Your Business
        </h1>
        <p className="text-lg text-gray-300 mb-6 text-center">
          Unlock your business potential with our premium listing services.
        </p>
        <div className="bg-gray-700 p-4 rounded-lg shadow-inner mb-6">
          <h2 className="text-2xl font-semibold text-purple-400 mb-3">Why Choose Us?</h2>
          <ul className="list-none space-y-3">
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">✔</span>
              <span>Reach a wider audience and grow your customer base</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">✔</span>
              <span>Showcase your services with detailed listings</span>
            </li>
          </ul>
        </div>
        <p className="text-center text-sm text-gray-400 mb-6">
          Please read and agree to our terms and conditions before proceeding.
        </p>
        <div className="flex items-center justify-center mb-6">
          <input
            type="checkbox"
            id="terms"
            className="w-5 h-5 text-purple-500 border-gray-700 focus:ring-purple-500 focus:ring-2 rounded-sm"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="terms" className="ml-3 text-sm text-gray-300">
            I agree to the{' '}
            <Link href="/terms-of-service" className="text-purple-500 underline">
              Terms and conditions
            </Link>.
          </label>
        </div>
        <button
          disabled={!agreed}
          onClick={() => router.push('/listing')}
          className={`w-full py-3 px-6 rounded-lg text-lg font-semibold text-white transition-all duration-200 ${agreed
              ? 'bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-500'
              : 'bg-gray-600 cursor-not-allowed'
            }`}
        >
          Proceed to Listing
        </button>
      </div>
    </div>
    <Footer />
    </>
  );
}
