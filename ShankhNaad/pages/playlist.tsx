import { useRecoilValue } from "recoil";
import { Track as TrackType } from "../types/body.types";
import Head from "next/head";
import { useEffect, useState } from "react";
import Track from "../components/Track";
import { GET_LIKED_TRACK } from "../graphql/query";
import { useQuery } from '@apollo/client';
import { LiveUser } from "../atoms/playerAtom";


const Playlist = () => {

  const { loading, error, data } = useQuery(GET_LIKED_TRACK);  
  const liveUser = useRecoilValue(LiveUser);
  const [likedTracks, setLikedTracks] = useState<Track[]>([]);

  useEffect(() => {
    if (!loading && !error && data) {
      const userlikedtracks = data.likedTracksFindAll ? data.likedTracksFindAll : [];

      const filteredTracks = userlikedtracks
        .filter((track) => track.user.username === liveUser.username)
        .map((track) => track.tracks)
        ;
      setLikedTracks(filteredTracks[0]);
    }

  }, [loading, error, data]);

  return (
    <div className="md:w-[calc(100vw-120px)] w-full">

      <Head>
        <title>Dhol Baaje - Liked Playlist</title>
      </Head>

      <section className="sm:ml-24 p-2 w-full">
        <div className="flex flex-col w-full">

          {likedTracks.length > 0 ? (
            <div>
              <h1 className="text-xl text-green-500 font-bold mx-auto w-full bg-black z-10 top-0 p-2 fixed">Liked Playlist </h1>

              <div className="mt-10 overflow-y-scroll scrollbarThin ">
                <div className="flex flex-col gap-3 p-1 h-[78vh] min-w-max border-2 border-[#262626] rounded-2xl overflow-y-scroll scrollbarThin">
                  {likedTracks.map((track: TrackType, i: number) => (
                    <Track track={track} key={i} playlist={likedTracks} />
                  ))}
                </div>
              </div>

            </div>
          ): (
            <div className="flex items-center justify-center">
              <h1 className="text-white">You have not liked any Track.</h1>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Playlist;
