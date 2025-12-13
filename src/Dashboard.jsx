// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Tracklist from './components/Tracklist';
import Playlist from './components/Playlist';

function Dashboard() {
    const [searchResults, setSearchResults] = useState([]);
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState('My Awesome Playlist');

    const addTrackToPlaylist = (trackToAdd) => {
        if (playlistTracks.some((track) => track.id === trackToAdd.id)) {
            console.log('Track ist bereits in der Playlist');
            return;
        }
        setPlaylistTracks((prevTracks) => [...prevTracks, trackToAdd]);
    };

    const removeTrackFromPlaylist = (trackToRemove) => {
        setPlaylistTracks((prevTracks) =>
            prevTracks.filter((track) => track.id !== trackToRemove.id)
        );
    };

    const updatePlaylistName = (name) => {
        setPlaylistName(name);
    };

    const savePlaylist = () => {
        // Diese Funktion wird im nächsten Schritt implementiert
        console.log(
            'Saving playlist to Spotify:',
            playlistName,
            playlistTracks
        );
    };

    // Funktion zur Suche nach Songs auf Spotify
    const searchSpotify = async (term) => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            console.error('Access Token nicht gefunden!');
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
                imageUrl: track.album.images[0]?.url,
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                    {/* Suchergebnisse */}
                    <div className="bg-gray-800 p-4 rounded-md">
                        <h2 className="text-xl font-bold mb-4">Results</h2>
                        <Tracklist
                            tracks={searchResults}
                            onAdd={addTrackToPlaylist}
                            isRemoval={false}
                        />
                    </div>
                    {/* Playlist */}
                    <Playlist
                        playlistName={playlistName}
                        playlistTracks={playlistTracks}
                        onNameChange={updatePlaylistName}
                        onRemove={removeTrackFromPlaylist}
                        onSave={savePlaylist}
                    />
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
