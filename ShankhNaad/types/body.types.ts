export interface Track {
  id: string;
  subjectId: number;
  key: string;
  title: string;
  subtitle: string;
  username: string;
  music: string;
  image: string;
  likes: number;
  n_listens: number;
  description: string;
  album: Genre[];
  value: number;
  purchasable: number;
  nftIpfsCid: string;
  nftCardanoTxId: string;
  nftName: string;
  nftDescription: string;
  nftAssetName: string;
  createdAt: string;
  updatedAt: string;
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

export interface Wallet {
  address: string;
}

export interface User {
  id: Id;
  username: string;
  wallet: Wallet;
  subscriptionEndDate: string;
}

export interface LikedTracks {
    id: Id;
    username: string;
    tracks: Track[];
}

export interface TrackHistory {
  username: string;
  tracks: Track[];
}

export interface MyTracks {
  username: string;
  tracks: Track[];
}

export interface ReorderProps {
  list: any
  startIndex: number
  endIndex: number
}