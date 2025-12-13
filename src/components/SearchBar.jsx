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
        <div className="flex items-center justify-center p-4">
            <input
                placeholder="Search..."
                onChange={handleTermChange}
                className="p-2 rounded-l-md text-white"
            />
            <button onClick={search} className="bg-blue-500 p-2 rounded-r-md">
                SEARCH
            </button>
        </div>
    );
}

export default SearchBar;
