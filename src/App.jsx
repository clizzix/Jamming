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
        <div>
            <h1>Jamming</h1>
            <button onClick={redirectToSpotifyAuthorize}>
                Sign in with Spotify
            </button>
        </div>
    );
}

export default App;
