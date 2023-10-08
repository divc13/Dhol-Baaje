/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { Mapper, MapperError } from '@logosphere/sdk';
import { LikedTracks, Track } from '../../entities';
import { TrackFlureeMap } from './track.fluree.map';

@Injectable()
export class LikedTracksFlureeMap extends Mapper<LikedTracks> {
  public toEntity(data: any): LikedTracks {
    const likedTracksOrError = LikedTracks.create({
      id: data['likedTracks/identifier'] || data.identifier,
      subjectId: String(data._id),
      createdAt: new Date(data['likedTracks/createdAt'] || data.createdAt),
      updatedAt: new Date(data['likedTracks/updatedAt'] || data.updatedAt),
      username: this.scalar<string>(
        String,
        data['likedTracks/username'] || data.username
      ),
      track: this.objectArrayToEntity<Track, TrackFlureeMap>(
        TrackFlureeMap,
        data['likedTracks/track'] || data.track
      ),
    });
    if (likedTracksOrError.isSuccess) {
      return likedTracksOrError.getValue();
    } else {
      throw new MapperError(JSON.stringify(likedTracksOrError.error));
    }
  }

  public fromEntity(likedTracks: LikedTracks): any {
    return {
      _id: likedTracks.subjectId
        ? Number(likedTracks.subjectId)
        : `likedTracks$${likedTracks.id}`,
      'likedTracks/identifier': likedTracks.id,
      'likedTracks/createdAt': Number(likedTracks.createdAt),
      'likedTracks/updatedAt': Number(likedTracks.updatedAt),
      'likedTracks/username': this.scalar<string>(String, likedTracks.username),
      'likedTracks/track': this.entityArrayToData<Track, TrackFlureeMap>(
        TrackFlureeMap,
        likedTracks.track
      ),
    };
  }
}
