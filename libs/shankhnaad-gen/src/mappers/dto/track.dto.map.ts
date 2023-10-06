/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { Mapper, MapperError } from '@logosphere/sdk';
import { TrackDto } from '../../dto';
import { Track, User } from '../../entities';
import { UserDtoMap } from './user.dto.map';

import { Genre } from '../../shankhnaad.model';

@Injectable()
export class TrackDtoMap extends Mapper<Track> {
  public toEntity(data: TrackDto): Track {
    const trackOrError = Track.create({
      id: data.id,
      subjectId: data.subjectId,
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
      key: this.scalar<number>(Number, data['key']),
      title: this.scalar<string>(String, data['title']),
      subtitle: this.scalar<string>(String, data['subtitle']),
      owner: this.objectToEntity<User, UserDtoMap>(UserDtoMap, data['owner']),
      music: this.scalar<string>(String, data['music']),
      image: this.scalar<string>(String, data['image']),
      likes: this.scalar<number>(Number, data['likes']),
      n_listens: this.scalar<number>(Number, data['n_listens']),
      description: this.scalar<string>(String, data['description']),
      album: this.enumArray<typeof Genre>(Genre, data['album']),
      value: this.scalar<number>(Number, data['value']),
      purchasable: this.scalar<number>(Number, data['purchasable']),
      nftIpfsCid: this.scalar<string>(String, data['nftIpfsCid']),
      nftCardanoTxId: this.scalar<string>(String, data['nftCardanoTxId']),
      nftName: this.scalar<string>(String, data['nftName']),
      nftDescription: this.scalar<string>(String, data['nftDescription']),
      nftAssetName: this.scalar<string>(String, data['nftAssetName']),
    });
    if (trackOrError.isSuccess) {
      return trackOrError.getValue();
    } else {
      throw new MapperError(JSON.stringify(trackOrError.error));
    }
  }

  public fromEntity(track: Track): TrackDto {
    return {
      subjectId: track.subjectId,
      id: track.id,
      createdAt: track.createdAt.toISOString(),
      updatedAt: track.updatedAt.toISOString(),
      key: this.scalar<number>(Number, track.key),
      title: this.scalar<string>(String, track.title),
      subtitle: this.scalar<string>(String, track.subtitle),
      owner: this.entityToData<User, UserDtoMap>(UserDtoMap, track.owner),
      music: this.scalar<string>(String, track.music),
      image: this.scalar<string>(String, track.image),
      likes: this.scalar<number>(Number, track.likes),
      n_listens: this.scalar<number>(Number, track.n_listens),
      description: this.scalar<string>(String, track.description),
      album: this.enumArray<typeof Genre>(Genre, track.album),
      value: this.scalar<number>(Number, track.value),
      purchasable: this.scalar<number>(Number, track.purchasable),
      nftIpfsCid: this.scalar<string>(String, track.nftIpfsCid),
      nftCardanoTxId: this.scalar<string>(String, track.nftCardanoTxId),
      nftName: this.scalar<string>(String, track.nftName),
      nftDescription: this.scalar<string>(String, track.nftDescription),
      nftAssetName: this.scalar<string>(String, track.nftAssetName),
    };
  }
}
