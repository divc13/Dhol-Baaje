import { Genre } from '../enum-types';

export class TrackDto {
  id?: string;
  subjectId?: string;
  createdAt?: string;
  updatedAt?: string;
  key?: number;
  title?: string;
  subtitle?: string;
  username?: string;
  music?: string;
  image?: string;
  likes?: number;
  n_listens?: number;
  description?: string;
  album?: Genre[];
  value?: number;
  purchasable?: number;
  nftIpfsCid?: string;
  nftCardanoTxId?: string;
  nftName?: string;
  nftDescription?: string;
  nftAssetName?: string;
}
