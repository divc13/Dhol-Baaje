/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { Mapper, MapperError } from '@logosphere/sdk';
import { TrackHistoryDto } from '../../dto';
import { TrackHistory, User, Track } from '../../entities';
import { UserDtoMap } from './user.dto.map';
import { TrackDtoMap } from './track.dto.map';

@Injectable()
export class TrackHistoryDtoMap extends Mapper<TrackHistory> {
  public toEntity(data: TrackHistoryDto): TrackHistory {
    const trackHistoryOrError = TrackHistory.create({
      id: data.id,
      subjectId: data.subjectId,
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
      user: this.objectToEntity<User, UserDtoMap>(UserDtoMap, data['user']),
      track: this.objectArrayToEntity<Track, TrackDtoMap>(
        TrackDtoMap,
        data['track']
      ),
    });
    if (trackHistoryOrError.isSuccess) {
      return trackHistoryOrError.getValue();
    } else {
      throw new MapperError(JSON.stringify(trackHistoryOrError.error));
    }
  }

  public fromEntity(trackHistory: TrackHistory): TrackHistoryDto {
    return {
      subjectId: trackHistory.subjectId,
      id: trackHistory.id,
      createdAt: trackHistory.createdAt.toISOString(),
      updatedAt: trackHistory.updatedAt.toISOString(),
      user: this.entityToData<User, UserDtoMap>(UserDtoMap, trackHistory.user),
      track: this.entityArrayToData<Track, TrackDtoMap>(
        TrackDtoMap,
        trackHistory.track
      ),
    };
  }
}
