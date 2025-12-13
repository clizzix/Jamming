// src/components/Track.jsx
import React from 'react';

function Track({ track }) {
    return (
        <div className="flex justify-between items-center p-2 border-b border-gray-600">
            <div>
                <h3 className="font-bold">{track.name}</h3>
                <p className="text-sm text-gray-400">
                    {track.artist} | {track.album}
                </p>
            </div>
            {/* Hier kommt später ein Button zum Hinzufügen des Tracks hinzu */}
        </div>
    );
}

export default Track;
