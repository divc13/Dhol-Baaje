/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { Mapper, MapperError } from '@logosphere/sdk';
import { MyTracks, User, Track } from '../../entities';
import { UserFlureeMap } from './user.fluree.map';
import { TrackFlureeMap } from './track.fluree.map';

@Injectable()
export class MyTracksFlureeMap extends Mapper<MyTracks> {
  public toEntity(data: any): MyTracks {
    const myTracksOrError = MyTracks.create({
      id: data['myTracks/identifier'] || data.identifier,
      subjectId: String(data._id),
      createdAt: new Date(data['myTracks/createdAt'] || data.createdAt),
      updatedAt: new Date(data['myTracks/updatedAt'] || data.updatedAt),
      user: this.objectToEntity<User, UserFlureeMap>(
        UserFlureeMap,
        data['myTracks/user'] || data.user
      ),
      track: this.objectArrayToEntity<Track, TrackFlureeMap>(
        TrackFlureeMap,
        data['myTracks/track'] || data.track
      ),
    });
    if (myTracksOrError.isSuccess) {
      return myTracksOrError.getValue();
    } else {
      throw new MapperError(JSON.stringify(myTracksOrError.error));
    }
  }

  public fromEntity(myTracks: MyTracks): any {
    return {
      _id: myTracks.subjectId
        ? Number(myTracks.subjectId)
        : `myTracks$${myTracks.id}`,
      'myTracks/identifier': myTracks.id,
      'myTracks/createdAt': Number(myTracks.createdAt),
      'myTracks/updatedAt': Number(myTracks.updatedAt),
      'myTracks/user': this.entityToData<User, UserFlureeMap>(
        UserFlureeMap,
        myTracks.user
      ),
      'myTracks/track': this.entityArrayToData<Track, TrackFlureeMap>(
        TrackFlureeMap,
        myTracks.track
      ),
    };
  }
}
