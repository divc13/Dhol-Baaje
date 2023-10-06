// SongList.tsx
import React from 'react';
import { useContext } from 'react';
import { MusicDataContext } from "./MusicDataContext";

interface SongListProps {
  searchTerm: string;
  selectedSongs: string[];
  setSelectedSongs: (songs: string[]) => void;
}


const SongList: React.FC<SongListProps> = ({ searchTerm, selectedSongs, setSelectedSongs }) => {
  const musicData = useContext(MusicDataContext);
  const handleSongToggle = (song: string) => {
    const updatedSongs = selectedSongs.includes(song)
      ? selectedSongs.filter((selectedSong) => selectedSong !== song)
      : [...selectedSongs, song];
    setSelectedSongs(updatedSongs);
  };

  return (
    <ul>
      {musicData
        .filter((song) => song.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((song) => (
          <li key={song.title}>
            <label>
              <input
                type="checkbox"
                checked={selectedSongs.includes(song.title)}
                onChange={() => handleSongToggle(song.title)}
              />
              {song.title}
            </label>
          </li>
        ))}
    </ul>
  );
};

export default SongList;
