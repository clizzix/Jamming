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
            <div className="flex items-start gap-4 min-w-0 grow">
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
