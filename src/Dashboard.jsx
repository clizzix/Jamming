// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Tracklist from './components/Tracklist';

function Dashboard() {
    const [searchResults, setSearchResults] = useState([]);

    const searchSpotify = async (term) => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            console.error('Access Token nicht gefunden!');
            // Optional: Nutzer zum Login umleiten
            return;
        }

        const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
            term
        )}`;

        try {
            const response = await fetch(searchUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Spotify-Suche fehlgeschlagen');
            }

            const jsonResponse = await response.json();
            if (!jsonResponse.tracks) {
                setSearchResults([]);
                return;
            }

            const tracks = jsonResponse.tracks.items.map((track) => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
            }));

            setSearchResults(tracks);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Navbar />
            <main>
                <SearchBar onSearch={searchSpotify} />
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Results</h2>
                    <Tracklist tracks={searchResults} />
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
