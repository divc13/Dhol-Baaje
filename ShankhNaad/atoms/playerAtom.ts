import { atom, selector } from "recoil";
import { useContext } from 'react';
import { Track, User } from "../types/body.types";
import { MusicDataContext } from "../components/MusicDataContext";

export const playState = atom({
  key: "1",
  default: false,
});

export const playingTrackState = atom<Track>({
  key: "2",
  default: undefined,
});

export const currentPlaylistState = atom<Track[]>({
  key: "3",
  default: undefined,
});

export const recentlyPlayedTracks = atom<Track[]>({
  key: "4",
  default: [],
});

export const likeTracksState = atom<Track[]>({
  key: "5",
  default: [],
});

export const LiveUser = atom<User>({
  key: "6",
  default: undefined,
});