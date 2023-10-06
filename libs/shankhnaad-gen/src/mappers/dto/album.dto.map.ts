/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { Mapper, MapperError } from '@logosphere/sdk';
import { AlbumDto } from '../../dto';
import { Album, Track } from '../../entities';
import { TrackDtoMap } from './track.dto.map';

import { Genre } from '../../shankhnaad.model';

@Injectable()
export class AlbumDtoMap extends Mapper<Album> {
  public toEntity(data: AlbumDto): Album {
    const albumOrError = Album.create({
      id: data.id,
      subjectId: data.subjectId,
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
      genre: this.enum<typeof Genre>(Genre, data['genre']),
      track: this.objectArrayToEntity<Track, TrackDtoMap>(
        TrackDtoMap,
        data['track']
      ),
    });
    if (albumOrError.isSuccess) {
      return albumOrError.getValue();
    } else {
      throw new MapperError(JSON.stringify(albumOrError.error));
    }
  }

  public fromEntity(album: Album): AlbumDto {
    return {
      subjectId: album.subjectId,
      id: album.id,
      createdAt: album.createdAt.toISOString(),
      updatedAt: album.updatedAt.toISOString(),
      genre: this.enum<typeof Genre>(Genre, album.genre),
      track: this.entityArrayToData<Track, TrackDtoMap>(
        TrackDtoMap,
        album.track
      ),
    };
  }
}
