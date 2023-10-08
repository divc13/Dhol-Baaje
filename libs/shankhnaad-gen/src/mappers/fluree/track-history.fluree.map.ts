/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { Mapper, MapperError } from '@logosphere/sdk';
import { TrackHistory, Track } from '../../entities';
import { TrackFlureeMap } from './track.fluree.map';

@Injectable()
export class TrackHistoryFlureeMap extends Mapper<TrackHistory> {
  public toEntity(data: any): TrackHistory {
    const trackHistoryOrError = TrackHistory.create({
      id: data['trackHistory/identifier'] || data.identifier,
      subjectId: String(data._id),
      createdAt: new Date(data['trackHistory/createdAt'] || data.createdAt),
      updatedAt: new Date(data['trackHistory/updatedAt'] || data.updatedAt),
      username: this.scalar<string>(
        String,
        data['trackHistory/username'] || data.username
      ),
      track: this.objectArrayToEntity<Track, TrackFlureeMap>(
        TrackFlureeMap,
        data['trackHistory/track'] || data.track
      ),
    });
    if (trackHistoryOrError.isSuccess) {
      return trackHistoryOrError.getValue();
    } else {
      throw new MapperError(JSON.stringify(trackHistoryOrError.error));
    }
  }

  public fromEntity(trackHistory: TrackHistory): any {
    return {
      _id: trackHistory.subjectId
        ? Number(trackHistory.subjectId)
        : `trackHistory$${trackHistory.id}`,
      'trackHistory/identifier': trackHistory.id,
      'trackHistory/createdAt': Number(trackHistory.createdAt),
      'trackHistory/updatedAt': Number(trackHistory.updatedAt),
      'trackHistory/username': this.scalar<string>(
        String,
        trackHistory.username
      ),
      'trackHistory/track': this.entityArrayToData<Track, TrackFlureeMap>(
        TrackFlureeMap,
        trackHistory.track
      ),
    };
  }
}
