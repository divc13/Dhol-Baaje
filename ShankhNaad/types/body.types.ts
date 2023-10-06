export interface Track {
  id: ID;
  key: string;
  title: string;
  subtitle: string;
  owner: User;
  music: string;
  image: string;
  likes: number;
  n_listens: number;
  description: string;
  album: Genre[];
  value: number;
  purchasable: number;
  nftIpfsCid: string,
  nftAssetName: string,
  nftName: string,
  nftDescription: string,
}

export enum Genre {
  Indie = "Indie",
  Love = "Love",
  Ambient = "Ambient",
  Party = "Party",
  Devotional = "Devotional",
  Decades = "Decades",
  Dance = "Dance",
  Student = "Student",
  Chill = "Chill",
  Workout = "Workout",
  Rock = "Rock",
  Sleep = "Sleep",
  Instrumental = "Instrumental",
  Jazz = "Jazz",
  Classical = "Classical",
  Focus = "Focus",
  Soul = "Soul",
  Travel = "Travel",
  Disco = "Disco",
  Sad = "Sad"
};

export interface Album {
    genre: Genre;
    tracks: Track[];
}

export interface User {
  username: string;
}

export interface LikedTracks {
    user: User;
    tracks: Track[];
}

export interface TrackHistory {
  user: User;
  tracks: Track[];
}

export interface MyTracks {
  user: User;
  tracks: Track[];
}

export interface ReorderProps {
  list: any
  startIndex: number
  endIndex: number
}