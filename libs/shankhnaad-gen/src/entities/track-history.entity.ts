import { Guard, Entity, EntityProps, Result } from '@logosphere/sdk';

import { Track } from './track.entity';

interface TrackHistoryProps extends EntityProps {
  username?: string;
  track?: Track[];
}

export class TrackHistory extends Entity<TrackHistoryProps> {
  get username(): string {
    return this.props.username;
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
