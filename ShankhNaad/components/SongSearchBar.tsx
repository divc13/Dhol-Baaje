import React, { useState } from 'react';

interface SongSearchBarProps {
  onAddSong: (song: string) => void;
}

const SongSearchBar: React.FC<SongSearchBarProps> = ({ onAddSong }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddSong = () => {
    // Logic to add the selected song to the playlist
    // You may need to provide a way to select a song from the search results
  };

  return (
    <div>
      <input type="text" placeholder="Search for songs" value={searchTerm} onChange={handleSearchChange} />
      <button onClick={handleAddSong}>Add Song</button>
    </div>
  );
};

export default SongSearchBar;
