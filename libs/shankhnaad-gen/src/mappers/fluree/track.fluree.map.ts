/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { Mapper, MapperError } from '@logosphere/sdk';
import { Track, User } from '../../entities';
import { UserFlureeMap } from './user.fluree.map';

import { Genre } from '../../shankhnaad.model';

@Injectable()
export class TrackFlureeMap extends Mapper<Track> {
  public toEntity(data: any): Track {
    const trackOrError = Track.create({
      id: data['track/identifier'] || data.identifier,
      subjectId: String(data._id),
      createdAt: new Date(data['track/createdAt'] || data.createdAt),
      updatedAt: new Date(data['track/updatedAt'] || data.updatedAt),
      key: this.scalar<number>(Number, data['track/key'] || data.key),
      title: this.scalar<string>(String, data['track/title'] || data.title),
      subtitle: this.scalar<string>(
        String,
        data['track/subtitle'] || data.subtitle
      ),
      owner: this.objectToEntity<User, UserFlureeMap>(
        UserFlureeMap,
        data['track/owner'] || data.owner
      ),
      music: this.scalar<string>(String, data['track/music'] || data.music),
      image: this.scalar<string>(String, data['track/image'] || data.image),
      likes: this.scalar<number>(Number, data['track/likes'] || data.likes),
      n_listens: this.scalar<number>(
        Number,
        data['track/n_listens'] || data.n_listens
      ),
      description: this.scalar<string>(
        String,
        data['track/description'] || data.description
      ),
      album: this.enumArray<typeof Genre>(
        Genre,
        data['track/album'] || data.album
      ),
      value: this.scalar<number>(Number, data['track/value'] || data.value),
      purchasable: this.scalar<number>(
        Number,
        data['track/purchasable'] || data.purchasable
      ),
      nftIpfsCid: this.scalar<string>(
        String,
        data['track/nftIpfsCid'] || data.nftIpfsCid
      ),
      nftCardanoTxId: this.scalar<string>(
        String,
        data['track/nftCardanoTxId'] || data.nftCardanoTxId
      ),
      nftName: this.scalar<string>(
        String,
        data['track/nftName'] || data.nftName
      ),
      nftDescription: this.scalar<string>(
        String,
        data['track/nftDescription'] || data.nftDescription
      ),
      nftAssetName: this.scalar<string>(
        String,
        data['track/nftAssetName'] || data.nftAssetName
      ),
    });
    if (trackOrError.isSuccess) {
      return trackOrError.getValue();
    } else {
      throw new MapperError(JSON.stringify(trackOrError.error));
    }
  }

  public fromEntity(track: Track): any {
    return {
      _id: track.subjectId ? Number(track.subjectId) : `track$${track.id}`,
      'track/identifier': track.id,
      'track/createdAt': Number(track.createdAt),
      'track/updatedAt': Number(track.updatedAt),
      'track/key': this.scalar<number>(Number, track.key),
      'track/title': this.scalar<string>(String, track.title),
      'track/subtitle': this.scalar<string>(String, track.subtitle),
      'track/owner': this.entityToData<User, UserFlureeMap>(
        UserFlureeMap,
        track.owner
      ),
      'track/music': this.scalar<string>(String, track.music),
      'track/image': this.scalar<string>(String, track.image),
      'track/likes': this.scalar<number>(Number, track.likes),
      'track/n_listens': this.scalar<number>(Number, track.n_listens),
      'track/description': this.scalar<string>(String, track.description),
      'track/album': this.enumArray<typeof Genre>(Genre, track.album),
      'track/value': this.scalar<number>(Number, track.value),
      'track/purchasable': this.scalar<number>(Number, track.purchasable),
      'track/nftIpfsCid': this.scalar<string>(String, track.nftIpfsCid),
      'track/nftCardanoTxId': this.scalar<string>(String, track.nftCardanoTxId),
      'track/nftName': this.scalar<string>(String, track.nftName),
      'track/nftDescription': this.scalar<string>(String, track.nftDescription),
      'track/nftAssetName': this.scalar<string>(String, track.nftAssetName),
    };
  }
}
