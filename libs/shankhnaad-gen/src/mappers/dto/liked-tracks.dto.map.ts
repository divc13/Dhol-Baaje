/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { Mapper, MapperError } from '@logosphere/sdk';
import { LikedTracksDto } from '../../dto';
import { LikedTracks, User, Track } from '../../entities';
import { UserDtoMap } from './user.dto.map';
import { TrackDtoMap } from './track.dto.map';

@Injectable()
export class LikedTracksDtoMap extends Mapper<LikedTracks> {
  public toEntity(data: LikedTracksDto): LikedTracks {
    const likedTracksOrError = LikedTracks.create({
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
    if (likedTracksOrError.isSuccess) {
      return likedTracksOrError.getValue();
    } else {
      throw new MapperError(JSON.stringify(likedTracksOrError.error));
    }
  }

  public fromEntity(likedTracks: LikedTracks): LikedTracksDto {
    return {
      subjectId: likedTracks.subjectId,
      id: likedTracks.id,
      createdAt: likedTracks.createdAt.toISOString(),
      updatedAt: likedTracks.updatedAt.toISOString(),
      user: this.entityToData<User, UserDtoMap>(UserDtoMap, likedTracks.user),
      track: this.entityArrayToData<Track, TrackDtoMap>(
        TrackDtoMap,
        likedTracks.track
      ),
    };
  }
}
