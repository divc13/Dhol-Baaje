/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ent, Prop, registerEnum } from '@logosphere/sdk';

@Ent('walletAsset')
class WalletAsset {
  @Prop({ doc: 'Name of the asset', examples: ['4269736f6e'] })
  name: string;

  @Prop({
    doc: 'Fingerprint of the asset',
    examples: ['asset12q7zh30hj2yme96wy8ms4fcdrwtep0auz8xqly'],
  })
  fingerprint: string;

  @Prop({
    doc: 'Policy ID of the asset',
    examples: ['0b7018936bc41808ddabd96b4908b583195a0c252b5752ad38012bdb'],
  })
  policyId: string;

  @Prop({ doc: 'Quantity of the asset', examples: ['1'] })
  quantity: number;

  @Prop({ doc: 'Metadata associated with the asset' })
  metadata: string;

  @Prop({ doc: 'Fluree subject ID of the asset', examples: ['87960930223082'] })
  assetSubjectId: string;

  @Prop({
    doc: 'Logosphere ID of the asset',
    examples: [
      '62c0ac76d6eebbf70828da57ea06c41a55001a2eb3cc929206d8f39abdbfaefc',
    ],
  })
  logosphereId: string;
}

@Ent('wallet')
class Wallet {
  @Prop({
    doc: 'Name of the wallet',
    examples: ['Babingos wallet'],
  })
  name: string;

  @Prop({
    doc: 'ID of the wallet',
    index: true,
    unique: true,
    examples: ['cd72843c95467883ccd6dafe227b91c96f071713'],
  })
  walletId: string;

  @Prop({
    doc: 'Address of the wallet',
    index: true,
    unique: true,
    examples: [
      'addr_test1qzsn8km55mp6cra7l20cymauks2fay8sqc3jr874mgmxpsa5mj4dvw5zrxmhauknj60c8tsf7x72ng0r8zmxa3necjlsgx9q6d',
    ],
  })
  address: string;

  @Prop({
    doc: 'Public key of the wallet',
    index: true,
    unique: true,
    examples: [
      'a1f009e6f5770c7b10729f27237c7ccc677739e31119a69766664dee611220948234926b2c445c2e9e2ff40f22beafa193d7fedf72e5e877bffd606d33b6638c',
    ],
  })
  publicKey: string;
  
  @Prop({
    doc: 'Balance of the wallet in lovelace',
    examples: [
      '0', '1000'
    ],
  })
  balance: number;

  @Prop({
    doc: 'Wallet assets',
    type: () => [WalletAsset],
  })
  assets: WalletAsset[];
}


@Ent('user')
class User {
  @Prop({
    doc: 'username',
    index: true,
    unique: true,
    examples: ['babingo_whoelse@gmail.com'],
  })
  username: string;

  @Prop({
    doc: 'User wallet',
    type: () => Wallet,
  })
  wallet: Wallet;

  @Prop({
    doc: 'Subscription End Date',
  })
  subscriptionEndDate: string;
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

registerEnum(Genre, 'Genre');

@Ent('track', { nft: true })
class Track {
  @Prop({
    examples: ['123456789'],
  })
  key: number;

  @Prop({
    examples: ['Song name'],
  })
  title: string;

  @Prop({
    examples: ['Some name'],
  })
  subtitle: string;

  @Prop()
  username: string;

  @Prop({
    examples: ['123456789'],
  })
  music: string;

  @Prop({
    examples: ['123456789'],
  })
  image: string;

  @Prop({
    examples: ['123456789'],
  })
  likes: number;

  @Prop({
    examples: ['123456789'],
  })
  n_listens: number;

  @Prop({
    examples: ['a great song!!!'],
  })
  description: string;

  @Prop({ type: () => [Genre], })
  album: Genre[];

  @Prop({
    examples: ['123456789'],
  })
  value: number;

  @Prop({
    examples: ['123456789'],
  })
  purchasable: number;
}

@Ent('reorderprops')
class ReorderProps {
  @Prop({ type: () => [Track], })
  list: Track[];

  @Prop({
    examples: ['0'],
  })
  startIndex: number;

  @Prop({
    examples: ['123456789'],
  })
  endIndex: number;
}

@Ent('album')
class Album {
  @Prop({ type: () => Genre, })
  genre: Genre;

  @Prop({ type: () => [Track], })
  track: Track[];
}

@Ent('liked_tracks')
class LikedTracks {
  @Prop()
  username: string;

  @Prop({ type: () => [Track], })
  track: Track[];
}

@Ent('track_history')
class TrackHistory {
  @Prop()
  username: string;

  @Prop({ type: () => [Track], })
  track: Track[];
}

@Ent('my_tracks')
class MyTracks {
  @Prop()
  username: string;

  @Prop({ type: () => [Track], })
  track: Track[];
}