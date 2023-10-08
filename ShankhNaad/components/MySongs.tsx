import { useContext } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { HeartIcon } from "@heroicons/react/solid";
import { BiHeadphone } from "react-icons/bi";
import { FaCoins } from "react-icons/fa";
import { BsFillPlayFill } from "react-icons/bs";
import { MusicDataContext } from "./MusicDataContext";
import { playingTrackState, playState } from "../atoms/playerAtom";
import { Track } from "../types/body.types"
import TrackContext from "../hooks/trackContext";


function MySongs() {
  const musicData = useContext(MusicDataContext);
  const musicDataCopy = [...musicData];
  const Tracks = musicDataCopy;
  const [play, setPlay] = useRecoilState<boolean>(playState);
  const playingTrack = useRecoilValue<Track>(playingTrackState);
  const { chooseTrack } = useContext(TrackContext);

  const handlePlay = (track: Track) => {
    chooseTrack(track, Tracks);
    if (!playingTrack) {
      setPlay(!play);
    }

    if (track.id === playingTrack?.id) {
      setPlay(!play);
    }
  };

  return (
    <div className="flex-col items-center px-2 py-1 border border-[#262626] rounded-lg">
      {Tracks.map((track, i) => (
      <div className="flex w-full gap-3 items-center py-2">
        <img
          src={"https://i.ytimg.com/vi/WcK88pFd2Lk/maxresdefault.jpg"}
          alt=""
          className="rounded-full w-[52px] h-[52px]"
        />
        <div className="flex-grow flex flex-col">
          <h4 className="text-white text-[13px] mb-0.5 font-semibold truncate max-w-[150px] hover:underline">
            {track.title}
          </h4>
          <p className="truncate text-xs text-[#686868] font-semibold hover:underline">
            {(track?.owner?.username || "").replace("-", " ").slice(0, 15) || ""}
          </p>
        </div>
        <div className="flex px-5 hover:scale-110">
            <HeartIcon className="w-6 h-6" /> 
            <p className="px-2">{ track?.likes }</p>
        </div>
        <div className="flex px-5 hover:scale-110">
            <BiHeadphone className="w-6 h-6"/>
            <p className="px-2">{ track?.n_listens }</p>
        </div>
        <div className="flex px-5 hover:scale-110">
            <FaCoins className="w-6 h-6"/>
            <p className="px-2">{ track?.value }</p>
        </div>
        <div className="h-10 w-10 rounded-full border border-[#15883e] flex items-center justify-center bg-[#15883e] icon hover:scale-110"
        onClick={handlePlay(track=track)}>
            <BsFillPlayFill className="w-6 h-6 text-white text-xl"/>
        </div>

      </div>))};

    </div> 
      
  );
}

export default MySongs;
