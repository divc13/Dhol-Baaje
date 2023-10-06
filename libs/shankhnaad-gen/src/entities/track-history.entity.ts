import { Guard, Entity, EntityProps, Result } from '@logosphere/sdk';

import { User } from './user.entity';
import { Track } from './track.entity';

interface TrackHistoryProps extends EntityProps {
  user?: User;
  track?: Track[];
}

export class TrackHistory extends Entity<TrackHistoryProps> {
  get user(): User {
    return this.props.user;
  }
  get track(): Track[] {
    return this.props.track;
  }

  private constructor(props: TrackHistoryProps) {
    super(props);
  }

  public static create(props: TrackHistoryProps): Result<TrackHistory> {
    const propsResult = Guard.againstNullOrUndefinedBulk([]);

    if (!propsResult.succeeded) {
      return Result.fail<TrackHistory>(propsResult.message);
    }

    const trackHistory = new TrackHistory(props);

    return Result.ok<TrackHistory>(trackHistory);
  }
}
