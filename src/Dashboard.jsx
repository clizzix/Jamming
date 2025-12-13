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

    const savePlaylist = async () => {
        const accessToken = localStorage.getItem('access_token');
        const trackUris = playlistTracks.map((track) => track.uri);

        if (!trackUris.length || !playlistName) {
            alert('Please add tracks to your playlist and give it a name.');
            return;
        }

        if (!accessToken) {
            console.error('Access Token not found!');
            return;
        }

        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        try {
            // 1. Get current user's ID
            const userResponse = await fetch('https://api.spotify.com/v1/me', {
                headers: headers,
            });
            if (!userResponse.ok) throw new Error('Failed to fetch user ID');
            const userData = await userResponse.json();
            const userId = userData.id;

            // 2. Create a new playlist
            const createPlaylistResponse = await fetch(
                `https://api.spotify.com/v1/users/${userId}/playlists`,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ name: playlistName, public: false }),
                }
            );
            if (!createPlaylistResponse.ok)
                throw new Error('Failed to create playlist');
            const playlistData = await createPlaylistResponse.json();
            const playlistId = playlistData.id;

            // 3. Add tracks to the new playlist
            await fetch(
                `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ uris: trackUris }),
                }
            );

            // Reset the state after successful save
            setPlaylistName('New Playlist');
            setPlaylistTracks([]);
            alert('Playlist saved to your Spotify account!');
        } catch (error) {
            console.error('Error saving playlist:', error);
            alert(`Error saving playlist: ${error.message}`);
        }
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
        <div className="bg-gray-900 text-white min-h-screen rounded-md">
            <Navbar />
            <main>
                <SearchBar onSearch={searchSpotify} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                    <div className="bg-gray-800 p-4 rounded-md">
                        <h2 className="text-xl font-bold mb-4">Results</h2>
                        <Tracklist
                            tracks={searchResults}
                            onAdd={addTrackToPlaylist}
                            isRemoval={false}
                        />
                    </div>
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
