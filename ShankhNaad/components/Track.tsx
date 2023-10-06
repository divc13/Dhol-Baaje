import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  likeTracksState,
  playingTrackState,
  playState,
} from "../atoms/playerAtom";
import { Track } from "../types/body.types";
import TrackContext from "../hooks/trackContext";
import Heart from "./track/Heart";
import { DELETE_TRACK, SAVE_TRACK } from "../graphql/mutation"
import { useMutation } from '@apollo/client';

interface TrackProps {
  track: Track;
  playlist: Track[];
}

function Track({ track, playlist }: TrackProps) {
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [play, setPlay] = useRecoilState<boolean>(playState);
  const playingTrack = useRecoilValue<Track>(playingTrackState);
  const [likedTracks, setLikedTracks] = useRecoilState<Track[]>(likeTracksState);
  const { chooseTrack } = useContext(TrackContext);
  const [Save_Track, { data, loading, error }] = useMutation(SAVE_TRACK);
  const [Delete_Track] = useMutation(DELETE_TRACK);

  const index = likedTracks?.findIndex(
    (tracks: Track) => tracks.key === track.key
  );
  useEffect(() => {
    let liked = index !== -1 ? true : false;
    setHasLiked(liked);
  }, [index]);

  const handlePlay = () => {
    chooseTrack(track, playlist);
    if (!playingTrack || track.music === playingTrack.music) {
      setPlay(!play);
    }

    if (track.music === playingTrack?.music) {
      setPlay(!play);
    }
  };

  function handleLike() {
    var a = 1;
    if (index == -1) {
      setLikedTracks([...likedTracks, track]);
    } else {
      const newAraay = likedTracks.filter((el: Track) => el.key !== track.key);
      setLikedTracks(newAraay);
      a = -1;
    }
    Delete_Track({
      variables: {
          id: track.id
        }
      });
  
    Save_Track({
    variables: {
        track: {
          key: track.key,
          title: track.title,
          subtitle: track.subtitle,
          owner: track.owner,
          music: track.music,
          image: track.image,
          likes: track.likes + 1,
          dislikes: track.dislikes,
          description: track.description,
          album: track.album,
          n_listens: track.n_listens,
          value: track.value,
          purchasable: track.purchasable
        }
    }
});
  }

  return (
    <div className={`flex items-center justify-between md:space-x-20 hover:bg-white/10 py-2 px-2 sm:px-4 rounded-lg group transition ease-out ${track.music === playingTrack?.music && 'bg-white/10'}`}>
      <div className="flex items-center gap-2 ">
        <div className="relative w-8 h-8 sm:w-12 sm:h-12 align-center">
          <img
            src={track.image}
            alt=""
            className="rounded-xl object-cover"
          />
        </div>

        <div>
          <h4 className="text-white text-[10px] sm:text-sm font-semibold truncate md:w-56 sm:w-[380px]">
            {track.title.substring(0,20)}
          </h4>
          <p className="text-[rgb(179,179,179)] text-[10px] font-semibold group-hover:text-white">
            {(track?.subtitle || "").replace("-", " ") || ""}
          </p>
        </div>
      </div>

      <div className="lg:ml-auto flex items-center md:space-x-2.5">
        <div className="flex items-center rounded-full border-2 border-[#262626] w-[85px] h-10 relative cursor-pointer group-hover:border-white/40">
          <Heart handleLike={handleLike} hasLiked={hasLiked} />
          {track.music === playingTrack?.music && play ? (
            <>
              <div
                className="h-10 w-10 rounded-full border border-[#15883e] flex items-center justify-center absolute -right-0.5 bg-[#15883e] icon hover:scale-110"
                onClick={handlePlay}
              >
                <BsFillPauseFill className="text-white text-xl" />
              </div>
            </>
          ) : (
            <>
              <div
                className="h-10 w-10 rounded-full border border-white/60 flex items-center justify-center absolute -right-0.5 hover:bg-[#15883e] hover:border-[#15883e] icon hover:scale-110"
                onClick={handlePlay}
              >
                <BsFillPlayFill className="text-white text-xl ml-[1px]" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Track;
