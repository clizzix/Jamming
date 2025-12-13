import React from 'react';
import Track from './Track';

function Tracklist({ tracks, onAdd, onRemove, isRemoval }) {
    return (
        <div className="w-full">
            {tracks.map((track) => {
                return (
                    <Track
                        track={track}
                        key={track.id}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        isRemoval={isRemoval}
                    />
                );
            })}
        </div>
    );
}

export default Tracklist;
