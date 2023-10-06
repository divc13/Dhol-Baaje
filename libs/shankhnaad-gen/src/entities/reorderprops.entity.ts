import { Guard, Entity, EntityProps, Result } from '@logosphere/sdk';

import { Track } from './track.entity';

interface ReorderpropsProps extends EntityProps {
  list?: Track[];
  startIndex?: number;
  endIndex?: number;
}

export class Reorderprops extends Entity<ReorderpropsProps> {
  get list(): Track[] {
    return this.props.list;
  }
  get startIndex(): number {
    return this.props.startIndex;
  }
  get endIndex(): number {
    return this.props.endIndex;
  }

  private constructor(props: ReorderpropsProps) {
    super(props);
  }

  public static create(props: ReorderpropsProps): Result<Reorderprops> {
    const propsResult = Guard.againstNullOrUndefinedBulk([]);

    if (!propsResult.succeeded) {
      return Result.fail<Reorderprops>(propsResult.message);
    }

    const reorderprops = new Reorderprops(props);

    return Result.ok<Reorderprops>(reorderprops);
  }
}
