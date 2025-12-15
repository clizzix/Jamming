// src/components/Callback.jsx

import React, { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ⚠️ ERSETZEN SIE DIESE WERTE ⚠️
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

function Callback() {
    const navigate = useNavigate();
    const isProcessing = useRef(false); // Ref, um Mehrfachausführung zu verhindern

    const exchangeCodeForToken = useCallback(
        async (code) => {
            // Code Verifier aus dem Local Storage abrufen
            const codeVerifier = localStorage.getItem('code_verifier');

            // ACHTUNG: Der Client Secret WIRD HIER NICHT VERWENDET, da dies eine Public Client App (React/Vite) ist.
            console.log('DEBUG (Callback.jsx): CLIENT_ID:', CLIENT_ID);
            console.log('DEBUG (Callback.jsx): REDIRECT_URI:', REDIRECT_URI);
            console.log('DEBUG (Callback.jsx): Code from URL:', code);
            console.log(
                'DEBUG (Callback.jsx): Code Verifier from localStorage:',
                codeVerifier
            );

            if (!codeVerifier) {
                console.error(
                    'Fehler: Code Verifier nicht im Local Storage gefunden.'
                );
                navigate('/');
                return;
            }

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
        },
        [navigate]
    );

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

        if (code) {
            // Verhindere Mehrfachausführung, besonders im React Strict Mode
            if (!isProcessing.current) {
                isProcessing.current = true; // Setze Flag, um weitere Aufrufe zu blockieren
                exchangeCodeForToken(code);
            } else {
                console.warn(
                    'Autorisierungscode wird bereits verarbeitet. Warte auf Abschluss...'
                );
            }
        } else {
            // Wenn kein Code vorhanden ist, zur Startseite navigieren.
            console.warn(
                'Kein Autorisierungscode in der URL gefunden. Umleitung zur Startseite.'
            );
            navigate('/');
        }
    }, [navigate, exchangeCodeForToken]);

    return <div>Wird geladen...</div>;
}

export default Callback;
