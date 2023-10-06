/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { Mapper, MapperError } from '@logosphere/sdk';
import { Reorderprops, Track } from '../../entities';
import { TrackFlureeMap } from './track.fluree.map';

@Injectable()
export class ReorderpropsFlureeMap extends Mapper<Reorderprops> {
  public toEntity(data: any): Reorderprops {
    const reorderpropsOrError = Reorderprops.create({
      id: data['reorderprops/identifier'] || data.identifier,
      subjectId: String(data._id),
      createdAt: new Date(data['reorderprops/createdAt'] || data.createdAt),
      updatedAt: new Date(data['reorderprops/updatedAt'] || data.updatedAt),
      list: this.objectArrayToEntity<Track, TrackFlureeMap>(
        TrackFlureeMap,
        data['reorderprops/list'] || data.list
      ),
      startIndex: this.scalar<number>(
        Number,
        data['reorderprops/startIndex'] || data.startIndex
      ),
      endIndex: this.scalar<number>(
        Number,
        data['reorderprops/endIndex'] || data.endIndex
      ),
    });
    if (reorderpropsOrError.isSuccess) {
      return reorderpropsOrError.getValue();
    } else {
      throw new MapperError(JSON.stringify(reorderpropsOrError.error));
    }
  }

  public fromEntity(reorderprops: Reorderprops): any {
    return {
      _id: reorderprops.subjectId
        ? Number(reorderprops.subjectId)
        : `reorderprops$${reorderprops.id}`,
      'reorderprops/identifier': reorderprops.id,
      'reorderprops/createdAt': Number(reorderprops.createdAt),
      'reorderprops/updatedAt': Number(reorderprops.updatedAt),
      'reorderprops/list': this.entityArrayToData<Track, TrackFlureeMap>(
        TrackFlureeMap,
        reorderprops.list
      ),
      'reorderprops/startIndex': this.scalar<number>(
        Number,
        reorderprops.startIndex
      ),
      'reorderprops/endIndex': this.scalar<number>(
        Number,
        reorderprops.endIndex
      ),
    };
  }
}
