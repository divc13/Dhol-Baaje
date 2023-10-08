import { Guard, Entity, EntityProps, Result } from '@logosphere/sdk';

import { Track } from './track.entity';

interface LikedTracksProps extends EntityProps {
  username?: string;
  track?: Track[];
}

export class LikedTracks extends Entity<LikedTracksProps> {
  get username(): string {
    return this.props.username;
  }
  get track(): Track[] {
    return this.props.track;
  }

  private constructor(props: LikedTracksProps) {
    super(props);
  }

  public static create(props: LikedTracksProps): Result<LikedTracks> {
    const propsResult = Guard.againstNullOrUndefinedBulk([]);

    if (!propsResult.succeeded) {
      return Result.fail<LikedTracks>(propsResult.message);
    }

    const likedTracks = new LikedTracks(props);

    return Result.ok<LikedTracks>(likedTracks);
  }
}
