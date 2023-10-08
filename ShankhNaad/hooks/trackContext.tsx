import { createContext, ReactNode } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  currentPlaylistState,
  playingTrackState,
  playState,
  recentlyPlayedTracks,
} from "../atoms/playerAtom";
import { Track } from "../types/body.types";
import recentPlayedCache from "../utils/cache";
import { DELETE_TRACK, SAVE_TRACK } from "../graphql/mutation"
import { useMutation } from '@apollo/client';

type chooseTrack = (track: Track, playlist: Track[]) => void;

type ReorderProps = (
  list: Track[],
  startIndex: number,
  endIndex: number
) => Track[];

type ITrackContext = {
  chooseTrack: chooseTrack;
  onDragEnd: (result: DropResult) => void;
};

const TrackContext = createContext<ITrackContext>(null as any);

export const TrackProvider = ({ children }: { children: ReactNode }) => {

  
  const [play, setPlay] = useRecoilState(playState);
  const [currentPlaylist, setCurrentPlaylist] = useRecoilState(currentPlaylistState);
  const setRecentlyPlayed = useSetRecoilState(recentlyPlayedTracks);
  const setPlayingTrack = useSetRecoilState(playingTrackState);
  const [Save_Track] = useMutation(SAVE_TRACK);
  const [Delete_Track] = useMutation(DELETE_TRACK);


  const chooseTrack: chooseTrack = (track, playlist) => {
    setCurrentPlaylist(playlist);
    const cachedData = recentPlayedCache(track?.id, track);
    setRecentlyPlayed([...cachedData]);
    setPlayingTrack(track);
      Save_Track({
      variables: {
          track: {
            id: 1234567,
            subjectId: track.subjectId,
            n_listens: track.n_listens + 1,
          }
      }
  });
    if (!play) setPlay(!play);
  };

  const reorder: ReorderProps = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }
    const startIndex = source.index;
    const endIndex = destination.index;

    const newList = reorder(currentPlaylist, startIndex, endIndex);

    setCurrentPlaylist(newList);
  };

  return (
    <TrackContext.Provider
      value={{
        chooseTrack,
        onDragEnd,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

export default TrackContext;
