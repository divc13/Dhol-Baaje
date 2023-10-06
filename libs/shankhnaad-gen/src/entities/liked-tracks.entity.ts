import { Guard, Entity, EntityProps, Result } from '@logosphere/sdk';

import { User } from './user.entity';
import { Track } from './track.entity';

interface LikedTracksProps extends EntityProps {
  user?: User;
  track?: Track[];
}

export class LikedTracks extends Entity<LikedTracksProps> {
  get user(): User {
    return this.props.user;
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
