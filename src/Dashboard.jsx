// src/pages/Dashboard.jsx
import React from 'react';

function Dashboard() {
    // Hier können Sie später API-Aufrufe mit dem access_token durchführen
    return (
        <div>
            <h2>Your Jamming Dashboard</h2>
            <p>Your Login was Succesfull</p>
            {/* Beispiel: Token anzeigen (nur zu Debugging-Zwecken) */}
            <p>
                Access Token:{' '}
                {localStorage.getItem('access_token')?.substring(0, 10)}...
            </p>
        </div>
    );
}

export default Dashboard;
