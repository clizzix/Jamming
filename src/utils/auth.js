// src/utils/auth.js

// 1. Erzeugt einen zufälligen String (Code Verifier)
export function generateRandomString(length) {
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
}

// 2. Erzeugt den Code Challenge aus dem Code Verifier (SHA256 + Base64url-Encoding)
async function sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
}

function base64urlencode(a) {
    // Wandelt den ArrayBuffer in einen Base64url-String um
    return btoa(String.fromCharCode(...new Uint8Array(a)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

async function generateCodeChallenge(codeVerifier) {
    const hashed = await sha256(codeVerifier);
    return base64urlencode(hashed);
}

// Exportieren Sie die Hauptfunktion, die den Code Verifier im Local Storage speichert
// und den Challenge zurückgibt
export async function generatePKCE() {
    const codeVerifier = generateRandomString(128); // 43-128 Zeichen
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    localStorage.setItem('code_verifier', codeVerifier);
    console.log(
        'DEBUG (auth.js): Code Verifier stored in localStorage:',
        codeVerifier
    );

    return codeChallenge;
}
