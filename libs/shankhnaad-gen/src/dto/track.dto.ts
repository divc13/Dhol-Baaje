import { Genre } from '../enum-types';
import { UserDto } from './user.dto';

export class TrackDto {
  id?: string;
  subjectId?: string;
  createdAt?: string;
  updatedAt?: string;
  key?: number;
  title?: string;
  subtitle?: string;
  owner?: UserDto;
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
