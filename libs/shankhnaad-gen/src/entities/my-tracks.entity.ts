import { Guard, Entity, EntityProps, Result } from '@logosphere/sdk';

import { Track } from './track.entity';

interface MyTracksProps extends EntityProps {
  username?: string;
  track?: Track[];
}

export class MyTracks extends Entity<MyTracksProps> {
  get username(): string {
    return this.props.username;
  }
  get track(): Track[] {
    return this.props.track;
  }

  private constructor(props: MyTracksProps) {
    super(props);
  }

  public static create(props: MyTracksProps): Result<MyTracks> {
    const propsResult = Guard.againstNullOrUndefinedBulk([]);

    if (!propsResult.succeeded) {
      return Result.fail<MyTracks>(propsResult.message);
    }

    const myTracks = new MyTracks(props);

    return Result.ok<MyTracks>(myTracks);
  }
}
