/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { Mapper, MapperError } from '@logosphere/sdk';
import { Album, Track } from '../../entities';
import { TrackFlureeMap } from './track.fluree.map';

import { Genre } from '../../shankhnaad.model';

@Injectable()
export class AlbumFlureeMap extends Mapper<Album> {
  public toEntity(data: any): Album {
    const albumOrError = Album.create({
      id: data['album/identifier'] || data.identifier,
      subjectId: String(data._id),
      createdAt: new Date(data['album/createdAt'] || data.createdAt),
      updatedAt: new Date(data['album/updatedAt'] || data.updatedAt),
      genre: this.enum<typeof Genre>(Genre, data['album/genre'] || data.genre),
      track: this.objectArrayToEntity<Track, TrackFlureeMap>(
        TrackFlureeMap,
        data['album/track'] || data.track
      ),
    });
    if (albumOrError.isSuccess) {
      return albumOrError.getValue();
    } else {
      throw new MapperError(JSON.stringify(albumOrError.error));
    }
  }

  public fromEntity(album: Album): any {
    return {
      _id: album.subjectId ? Number(album.subjectId) : `album$${album.id}`,
      'album/identifier': album.id,
      'album/createdAt': Number(album.createdAt),
      'album/updatedAt': Number(album.updatedAt),
      'album/genre': this.enum<typeof Genre>(Genre, album.genre),
      'album/track': this.entityArrayToData<Track, TrackFlureeMap>(
        TrackFlureeMap,
        album.track
      ),
    };
  }
}
