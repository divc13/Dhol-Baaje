import { Guard, Entity, EntityProps, Result } from '@logosphere/sdk';
import { Genre } from '../shankhnaad.model';

import { Track } from './track.entity';

interface AlbumProps extends EntityProps {
  genre?: Genre;
  track?: Track[];
}

export class Album extends Entity<AlbumProps> {
  get genre(): Genre {
    return this.props.genre;
  }
  get track(): Track[] {
    return this.props.track;
  }

  private constructor(props: AlbumProps) {
    super(props);
  }

  public static create(props: AlbumProps): Result<Album> {
    const propsResult = Guard.againstNullOrUndefinedBulk([]);

    if (!propsResult.succeeded) {
      return Result.fail<Album>(propsResult.message);
    }

    const album = new Album(props);

    return Result.ok<Album>(album);
  }
}
