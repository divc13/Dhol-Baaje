import React, { useEffect, useState } from 'react';
import { FaCoins } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { LiveUser } from '../atoms/playerAtom';
import SongList from './SongList';
import { Track } from '../types/body.types';
import { useQuery } from '@apollo/client';
import { GET_ALL_SONGS } from '../graphql/query';
import Link from 'next/link';

const Profile = () => {
  const liveUser = useRecoilValue(LiveUser);
  const [UserSongs, setUserSongs] = useState<Track[]>([]);
  const { loading, error, data } = useQuery(GET_ALL_SONGS);

  useEffect(() => {
    if (!loading && !error && data) {
      const updatedMusicData = data.trackFindAll ? data.trackFindAll : [];
      const userSongsFiltered = updatedMusicData.filter(track => track.owner === liveUser.username);
      setUserSongs(userSongsFiltered);
      console.log(liveUser.id);
      console.log(userSongsFiltered);
    }
  }, [loading, error, data]);

  return (
    <section className="sm:ml-24 w-full overflow-y-scroll scrollbarThin">
      <div className="flex w-full justify-between item-center bg-black p-2 fixed">
        <div className="text-xl text-green-500 font-bold">My Songs</div>
        <div className="flex items-center sm:mr-24">
          {/* <FaCoins className="w-5 h-5 mr-2" aria-hidden="true" /> */}
        <Link href="/upload"><button className="transparent hover:bg-green-700 border boder:white py-2 px-4 mb-5 rounded">Upload Track</button></Link>
        </div>
      </div>
      <div className="mt-16">
        {UserSongs.length > 0 ? (
          UserSongs.map((track, i) => (
            <SongList key={i} track={track} playlist={UserSongs} />
          ))
        ) : (
          <div className="text-white p-4">
            <p>You have not uploaded any songs.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
