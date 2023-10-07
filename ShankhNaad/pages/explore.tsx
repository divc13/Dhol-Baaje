import React, { lazy, Suspense } from 'react';
import { Genre } from '../types/body.types';
import { MusicDataContext } from '../components/MusicDataContext';
import { useContext } from 'react';
import Head from 'next/head';

// Lazy load the Poster component
const LazyPoster = lazy(() => import('../components/Poster'));

const Explore = () => {
  const playlists = [];
  const genres = Object.values(Genre);
  const musicData = useContext(MusicDataContext);

  if (musicData) {
    for (const genre of genres) {
      const genrePlaylist = musicData.filter((track) => {
        return track.album && track.album.includes(genre);
      });
      if (genrePlaylist.length > 0) {
        playlists.push({
          name: genre,
          playlist: genrePlaylist,
        });
      }
    }
  }

  return (
    <>
      <Head>
        <title>Dhol Baaje - Explore </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="sm:ml-24 p-2 w-full sm:w-[calc(100vw-120px)] mb-24">
        <div className="flex flex-col sm:w-[calc(100vw-120px)]">
          <h1 className="text-xl text-green-500 font-bold mx-auto w-full bg-black z-10 top-0 p-2 fixed">
            Explore Tracks
          </h1>
          <div className="mt-10" />

          {playlists.map((playlist, index) => (
            <div key={index} className="flex flex-col w-full">
              <h1 className="p-2">{playlist.name}</h1>

              <div className="m- overflow-y-scroll scrollbarThin">
                <div className="flex gap-4 p-1 h-[150px] sm:h-[220px] min-w-max">
                  {playlist.playlist.map((track, i) => (
                    <Suspense key={i} fallback={<div>Loading...</div>}>
                      <LazyPoster track={track} key={i} playlist={playlist.playlist} />
                    </Suspense>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Explore;
