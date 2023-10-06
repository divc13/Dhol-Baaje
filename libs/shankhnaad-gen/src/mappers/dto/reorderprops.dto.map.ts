/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { Mapper, MapperError } from '@logosphere/sdk';
import { ReorderpropsDto } from '../../dto';
import { Reorderprops, Track } from '../../entities';
import { TrackDtoMap } from './track.dto.map';

@Injectable()
export class ReorderpropsDtoMap extends Mapper<Reorderprops> {
  public toEntity(data: ReorderpropsDto): Reorderprops {
    const reorderpropsOrError = Reorderprops.create({
      id: data.id,
      subjectId: data.subjectId,
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
      list: this.objectArrayToEntity<Track, TrackDtoMap>(
        TrackDtoMap,
        data['list']
      ),
      startIndex: this.scalar<number>(Number, data['startIndex']),
      endIndex: this.scalar<number>(Number, data['endIndex']),
    });
    if (reorderpropsOrError.isSuccess) {
      return reorderpropsOrError.getValue();
    } else {
      throw new MapperError(JSON.stringify(reorderpropsOrError.error));
    }
  }

  public fromEntity(reorderprops: Reorderprops): ReorderpropsDto {
    return {
      subjectId: reorderprops.subjectId,
      id: reorderprops.id,
      createdAt: reorderprops.createdAt.toISOString(),
      updatedAt: reorderprops.updatedAt.toISOString(),
      list: this.entityArrayToData<Track, TrackDtoMap>(
        TrackDtoMap,
        reorderprops.list
      ),
      startIndex: this.scalar<number>(Number, reorderprops.startIndex),
      endIndex: this.scalar<number>(Number, reorderprops.endIndex),
    };
  }
}
