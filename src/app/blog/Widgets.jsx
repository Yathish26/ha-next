'use client';

import React, { useEffect, useState } from 'react';

export default function Widgets() {
  const [exchangeRates, setExchangeRates] = useState(null);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/gh/prebid/currency-file@1/latest.json?date")
      .then((response) => response.json())
      .then((data) => setExchangeRates(data.conversions.USD))
      .catch((error) => console.error("Error fetching exchange rates:", error));
  }, []);

  return (
    <div>
      <h1 className='text-[2rem] font-semibold my-6'>
        USD Rates on {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
      </h1>
      <div className='gap-4 grid grid-cols-4 mo:grid-cols-2'>
        {exchangeRates ? (
          <>
            <div className='w-fit h-fit bg-[#EECDFF] mo:bg-[#E7B7FF] p-4 rounded-xl flex flex-col gap-4'>
              <p className='font-semibold font-spartan'>INR</p>
              <div className='flex gap-4'>
                <p className='text-3xl font-semibold'>{(exchangeRates.INR).toFixed(2)}</p>
                <p className='text-3xl font-semibold'>₹</p>
              </div>
            </div>
            <div className='w-fit h-fit bg-[#EECDFF] mo:bg-[#E7B7FF] p-4 rounded-xl flex flex-col gap-4'>
              <p className='font-semibold font-spartan'>EUR</p>
              <div className='flex gap-4'>
                <p className='text-3xl font-semibold'>{(exchangeRates.EUR).toFixed(2)}</p>
                <p className='text-3xl font-semibold'>€</p>
              </div>
            </div>
            <div className='w-fit h-fit bg-[#EECDFF] mo:bg-[#E7B7FF] p-4 rounded-xl flex flex-col gap-4'>
              <p className='font-semibold font-spartan'>GBP</p>
              <div className='flex gap-4'>
                <p className='text-3xl font-semibold'>{(exchangeRates.GBP).toFixed(2)}</p>
                <p className='text-3xl font-semibold'>£</p>
              </div>
            </div>
            <div className='w-fit h-fit bg-[#EECDFF] mo:bg-[#E7B7FF] p-4 rounded-xl flex flex-col gap-4'>
              <p className='font-semibold font-spartan'>JPY</p>
              <div className='flex gap-4'>
                <p className='text-3xl font-semibold'>{(exchangeRates.JPY).toFixed(2)}</p>
                <p className='text-3xl font-semibold'>¥</p>
              </div>
            </div>
          </>
        ) : (
          <p className='font-semibold'>Loading...</p>
        )}
      </div>
    </div>
  );
}

