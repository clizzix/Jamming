import React, { useEffect } from 'react';
import { generatePKCE } from './utils/auth';
import { useNavigate } from 'react-router-dom';
import './App.css';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
const SCOPES = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-modify-private',
];

function App() {
    const navigate = useNavigate();

    const redirectToSpotifyAuthorize = async () => {
        const codeChallenge = await generatePKCE();

        const params = new URLSearchParams({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: SCOPES.join(' '),
            redirect_uri: REDIRECT_URI,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
        });

        window.location.href = `${SPOTIFY_AUTHORIZE_URL}?${params.toString()}`;
    };

    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
        useEffect(() => {
            navigate('/dashboard');
        }, [navigate]);

        return <div>Loading...</div>;
    }
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center text-center gap-8 p-4">
            <h1 className="text-5xl font-bold">Jamming</h1>
            <p className="text-lg text-gray-300">
                Create and save your perfect Spotify playlist.
            </p>
            <button
                onClick={redirectToSpotifyAuthorize}
                className="bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition-colors text-lg cursor-pointer"
            >
                Sign in with Spotify
            </button>
        </div>
    );
}

export default App;
