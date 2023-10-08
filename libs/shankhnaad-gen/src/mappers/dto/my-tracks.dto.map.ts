/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { Mapper, MapperError } from '@logosphere/sdk';
import { MyTracksDto } from '../../dto';
import { MyTracks, Track } from '../../entities';
import { TrackDtoMap } from './track.dto.map';

@Injectable()
export class MyTracksDtoMap extends Mapper<MyTracks> {
  public toEntity(data: MyTracksDto): MyTracks {
    const myTracksOrError = MyTracks.create({
      id: data.id,
      subjectId: data.subjectId,
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
      username: this.scalar<string>(String, data['username']),
      track: this.objectArrayToEntity<Track, TrackDtoMap>(
        TrackDtoMap,
        data['track']
      ),
    });
    if (myTracksOrError.isSuccess) {
      return myTracksOrError.getValue();
    } else {
      throw new MapperError(JSON.stringify(myTracksOrError.error));
    }
  }

  public fromEntity(myTracks: MyTracks): MyTracksDto {
    return {
      subjectId: myTracks.subjectId,
      id: myTracks.id,
      createdAt: myTracks.createdAt.toISOString(),
      updatedAt: myTracks.updatedAt.toISOString(),
      username: this.scalar<string>(String, myTracks.username),
      track: this.entityArrayToData<Track, TrackDtoMap>(
        TrackDtoMap,
        myTracks.track
      ),
    };
  }
}
