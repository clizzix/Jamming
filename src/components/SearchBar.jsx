import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [term, setTerm] = useState('');

    const handleTermChange = (event) => {
        setTerm(event.target.value);
    };

    const search = () => {
        onSearch(term);
    };

    return (
        <div className="p-4 flex justify-center">
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search for a song, artist, or album..."
                    onChange={handleTermChange}
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-full py-3 pl-5 pr-12 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    onClick={search}
                    className="absolute inset-y-0 right-0 flex items-center justify-center px-4 text-gray-400 hover:text-white cursor-pointer"
                    aria-label="Search"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
