// src/components/Playlist.jsx
import React from 'react';
import Tracklist from './Tracklist';

function Playlist({
    playlistName,
    playlistTracks,
    onNameChange,
    onRemove,
    onSave,
}) {
    const handleNameChange = (event) => {
        onNameChange(event.target.value);
    };

    return (
        <div className="p-4 bg-gray-800 rounded-md">
            <h2 className="text-xl font-bold mb-4">Playlist</h2>
            <input
                onChange={handleNameChange}
                value={playlistName}
                className="bg-gray-700 p-2 rounded-md w-full mb-4"
            />
            <Tracklist
                tracks={playlistTracks}
                onRemove={onRemove}
                isRemoval={true}
            />
            <button
                onClick={onSave}
                className="bg-green-500 w-full p-2 mt-4 rounded-md cursor-pointer hover:bg-green-600"
            >
                SAVE TO SPOTIFY
            </button>
        </div>
    );
}

export default Playlist;
