import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Callback from './components/Callback.jsx'; // Importieren Sie den Callback-Component
import Dashboard from './Dashboard.jsx'; // Importieren Sie den neuen Dashboard-Component
import './index.css'; // Ihre CSS-Datei

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                {/* Hauptpfad (Login-Seite) */}
                <Route path="/" element={<App />} />

                {/* ⚠️ WICHTIG: Der Pfad muss EXAKT dem Pfad in Ihrer REDIRECT_URI entsprechen */}
                {/* Wenn Ihre URI z.B. http://127.0.0.1:3000/auth-response ist, muss der Pfad hier /auth-response sein */}
                <Route path="/callback" element={<Callback />} />

                {/* Geschützter Bereich nach erfolgreichem Login */}
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
