// src/components/Callback.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ⚠️ ERSETZEN SIE DIESE WERTE ⚠️
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

function Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Prüfpunkt: CLIENT_ID geladen:', CLIENT_ID);
        console.log('Prüfpunkt: REDIRECT_URI geladen:', REDIRECT_URI);
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const error = params.get('error');

        // Fehlerbehandlung
        if (error) {
            console.error('Spotify Autorisierungsfehler:', error);
            navigate('/');
            return;
        }

        // Code-Exchange nur ausführen, wenn wir einen Code haben
        if (code) {
            exchangeCodeForToken(code);
        } else {
            // Keine Autorisierungsinformationen vorhanden (z.B. direkter Aufruf)
            navigate('/');
        }
    }, [navigate]);

    async function exchangeCodeForToken(code) {
        // Code Verifier aus dem Local Storage abrufen
        const codeVerifier = localStorage.getItem('code_verifier');

        // ACHTUNG: Der Client Secret WIRD HIER NICHT VERWENDET, da dies eine Public Client App (React/Vite) ist.

        const payload = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            code_verifier: codeVerifier,
        });

        try {
            const response = await fetch(TOKEN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: payload.toString(),
            });

            if (!response.ok) {
                let errorBody = await response.text();
                try {
                    errorBody = JSON.parse(errorBody);
                } catch (e) {}
                console.error(
                    'Token-Austausch fehlgeschlagen. Status:',
                    response.status,
                    'Antwort:',
                    errorBody
                );
                throw new Error(`Spotify API Error: ${response.status}`);
            }

            const data = await response.json();

            console.log('Antwort-Payload von Spotify:', data);

            if (data.access_token) {
                // 4. Token speichern und zur App umleiten
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);

                // Aufräumen
                localStorage.removeItem('code_verifier');

                // Zur Hauptseite oder einem Dashboard weiterleiten
                navigate('/dashboard');
            } else {
                console.error(
                    'Erfolgreicher HTTP-Status (200), aber ungültige oder fehlende Token-Antwort:',
                    data
                );
            }
        } catch (e) {
            console.error('Token-Austausch fehlgeschlagen:', e);
            // Bei einem Fehler zurück zur Startseite navigieren
            navigate('/');
        }
    }

    return <div>Wird geladen...</div>;
}

export default Callback;
