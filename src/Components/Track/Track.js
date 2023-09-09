import React from 'react';

const Track = ({ track, onAdd, onRemove }) => {
  const handleAddTrack = () => {
    onAdd(track);
  };

  const handleRemoveTrack = () => {
    onRemove(track);
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      {/* Additional track component content */}
      <button className="Track-action" onClick={handleAddTrack}>+</button>
      <button className="Track-action" onClick={handleRemoveTrack}>-</button>
    </div>
  );
};

export default Track;