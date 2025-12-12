import React, { useState } from 'react';
import './App.css';

function App() {
    return (
        <>
            <div>
                <button className="bg-slate-700 text-white py-0.75 px-2 rounded-xl cursor-pointer">
                    Search
                </button>
            </div>
            <div>
                <h1>Hello</h1>
            </div>
            <div>
                <button className="bg-slate-700 text-white py-0.75 px-2 rounded-xl cursor-pointer">
                    Save to Spotify
                </button>
            </div>
        </>
    );
}

export default App;
