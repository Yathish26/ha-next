"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Shimmer from '../Shimmer';
import { CSSTransition } from 'react-transition-group';

const HomeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [apiData, setApiData] = useState([]);
  const [clear, setClear] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const resultsPerPage = 10;
  const nodeRef = useRef(null);

  const fetchData = async (pageNum) => {
    const start = pageNum * resultsPerPage;
    const end = start + resultsPerPage;
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/data?All=${debouncedTerm}&Entries=${start}-${end}`);
      if (response.status === 404) {
        setApiData([]);
      } else {
        const data = await response.json();
        if (data.error) {
          setApiData([]);
        } else {
          setApiData(data);
        }
      }
    } catch (error) {
      setApiData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedTerm.trim()) {
      fetchData(page);
    } else {
      setApiData([]);
    }
  }, [debouncedTerm, page]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setClear(e.target.value !== '');
    setPage(0);
  };

  const handleClear = useCallback(() => {
    setSearchTerm('');
    setDebouncedTerm('');
    setClear(false);
    setPage(0);
  }, []);

  const createSlug = (name, id) => {
    return `${name.toLowerCase().replace(/\s+/g, '-')}*${id}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="flex items-center justify-center my-4">
        <div className="flex w-2/3 items-center border border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-purple-700">
          <div className="px-3 mo:pr-0">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for services, e.g., plumber, electrician..."
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full p-4 py-4 focus:outline-none rounded-full"
          />
          {clear && (
            <div onClick={handleClear} className="px-3 cursor-pointer">
              <img draggable="false" className="w-6 h-6" src="/logos/cross.svg" alt="Clear" />
            </div>
          )}
        </div>
      </div>

      <CSSTransition
        in={searchTerm.trim() !== ''}
        timeout={300}
        classNames="slide"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className='bg-purple-200 m-12 mo:m-4 rounded-3xl shadow-lg'>
          {loading ? (
            <Shimmer />
          ) : apiData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-8">
              {apiData.map((result) => (
                <Link
                  href={`/${(result.Category || result.category)}/${createSlug(result.Name || result.businessName, result._id)}`}
                  key={result._id}
                >
                  <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:bg-purple-700 transition duration-300 cursor-pointer">
                    <h2 className="text-2xl font-semibold text-purple-500 mb-2">
                      {result.Name || result.businessName}
                    </h2>

                    {/* Address Section */}
                    <div className="flex items-center">
                      <img draggable="false" className="w-4 h-4 mr-2" src="/logos/address.svg" alt="Address:" />
                      <p className="text-gray-300">
                        {result.Address ||
                          (result.streetAddress || result.city || result.state || result.zipCode
                            ? `${result.streetAddress} ${result.city} ${result.state} ${result.zipCode}`.trim()
                            : result.serviceLocation || "N/A")}
                      </p>
                    </div>

                    {/* Category and Location */}
                    <div className='flex justify-between'>
                      <p className="mt-2 inline-block px-3 py-1 border border-purple-500 text-purple-500 rounded-full text-sm">
                        {result.Category || result.category || "Uncategorized"}
                      </p>
                      <div className="mt-2 flex gap-1 justify-center items-center px-3 py-1 border border-green-500 text-green-500 rounded-full text-sm">
                        <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.6211 8.45C19.5711 3.83 15.5411 1.75 12.0011 1.75C12.0011 1.75 12.0011 1.75 11.9911 1.75C8.46107 1.75 4.42107 3.82 3.37107 8.44C2.20107 13.6 5.36107 17.97 8.22107 20.72C9.28107 21.74 10.6411 22.25 12.0011 22.25C13.3611 22.25 14.7211 21.74 15.7711 20.72C18.6311 17.97 21.7911 13.61 20.6211 8.45ZM12.0011 13.46C10.2611 13.46 8.85107 12.05 8.85107 10.31C8.85107 8.57 10.2611 7.16 12.0011 7.16C13.7411 7.16 15.1511 8.57 15.1511 10.31C15.1511 12.05 13.7411 13.46 12.0011 13.46Z" fill="#3F9C6E"></path>
                        </svg>
                        <p className='font-semibold'>{result.Location || result.serviceLocation || "Unknown"}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : !loading && (
            <div className="flex flex-col items-center justify-center mt-12 p-8 ">
              <img draggable="false" className="w-20 h-20 mo:w-12 mo:h-12 mb-6 text-gray-400" src="/logos/no-result.svg" alt="No Result" />
              <p className="text-2xl text-gray-800 font-bold mb-2">No results found</p>
              <p className="text-gray-600 text-center max-w-md">
                We couldn’t find any matches for
                <span className="font-semibold text-gray-800"> "{searchTerm}"</span>.<br />
                Please try again with a different keyword.
              </p>
            </div>
          )}

          {/* Pagination Controls */}
          {apiData.length > 0 && (
            <div className="flex justify-center my-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-l-lg"
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white"
                disabled
              >
                Page {page + 1}
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-r-lg"
                onClick={() => setPage(page + 1)}
                disabled={apiData.length < resultsPerPage}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </CSSTransition>
    </>
  );
};

export default HomeSearch;
