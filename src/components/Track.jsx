// src/components/Track.jsx
import React from 'react';

function Track({ track, onAdd, onRemove, isRemoval }) {
    const handleAdd = () => {
        onAdd(track);
    };
    const handleRemove = () => {
        onRemove(track);
    };
    return (
        <div className="flex justify-between items-center p-2 border-b border-gray-600">
            {/* flex-grow sorgt dafür, dass dieser Container den verfügbaren Platz einnimmt */}
            {/* min-w-0 ist der Schlüssel, um Flexbox zu erlauben, den Container zu schrumpfen */}
            {/* items-start richtet den Textblock oben am Bild aus, anstatt ihn vertikal zu zentrieren */}
            <div className="flex items-center gap-4 min-w-0 grow">
                <img
                    src={track.imageUrl}
                    alt={`Album cover for ${track.album}`}
                    className="w-16 h-16 shrink-0"
                />
                {/* Dieser Container stapelt jetzt den Titel und die Künstlerinfo vertikal */}
                {/* truncate und overflow-hidden sorgen für sauberes Abschneiden von Text */}
                <div className="overflow-hidden grow">
                    <h3 className="font-bold truncate">{track.name}</h3>
                    <p className="text-sm text-gray-400">
                        {track.artist} | {track.album}
                    </p>
                </div>
            </div>
            {isRemoval ? (
                <button
                    onClick={handleRemove}
                    className="bg-red-500 py-2 px-4 rounded-md cursor-pointer"
                >
                    -
                </button>
            ) : (
                <button
                    onClick={handleAdd}
                    className="bg-blue-500 py-2 px-4 rounded-md cursor-pointer"
                >
                    +
                </button>
            )}
        </div>
    );
}

export default Track;
