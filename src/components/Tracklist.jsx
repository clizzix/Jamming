import React from 'react';
import Track from './Track';

function Tracklist({ tracks }) {
    return (
        <div className="w-full">
            {tracks.map((track) => {
                return <Track track={track} key={track.id} />;
            })}
        </div>
    );
}

export default Tracklist;
