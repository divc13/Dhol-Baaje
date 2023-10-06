import { Guard, Entity, EntityProps, Result } from '@logosphere/sdk';
import { Genre } from '../shankhnaad.model';

import { User } from './user.entity';

interface TrackProps extends EntityProps {
  key?: number;
  title?: string;
  subtitle?: string;
  owner?: User;
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

export class Track extends Entity<TrackProps> {
  get key(): number {
    return this.props.key;
  }
  get title(): string {
    return this.props.title;
  }
  get subtitle(): string {
    return this.props.subtitle;
  }
  get owner(): User {
    return this.props.owner;
  }
  get music(): string {
    return this.props.music;
  }
  get image(): string {
    return this.props.image;
  }
  get likes(): number {
    return this.props.likes;
  }
  get n_listens(): number {
    return this.props.n_listens;
  }
  get description(): string {
    return this.props.description;
  }
  get album(): Genre[] {
    return this.props.album;
  }
  get value(): number {
    return this.props.value;
  }
  get purchasable(): number {
    return this.props.purchasable;
  }
  get nftIpfsCid(): string {
    return this.props.nftIpfsCid;
  }
  get nftCardanoTxId(): string {
    return this.props.nftCardanoTxId;
  }
  get nftName(): string {
    return this.props.nftName;
  }
  get nftDescription(): string {
    return this.props.nftDescription;
  }
  get nftAssetName(): string {
    return this.props.nftAssetName;
  }

  private constructor(props: TrackProps) {
    super(props);
  }

  public static create(props: TrackProps): Result<Track> {
    const propsResult = Guard.againstNullOrUndefinedBulk([]);

    if (!propsResult.succeeded) {
      return Result.fail<Track>(propsResult.message);
    }

    const track = new Track(props);

    return Result.ok<Track>(track);
  }
}
