/* eslint-disable @typescript-eslint/no-empty-interface */
import { Repository } from '@logosphere/sdk';
import { Album } from '../../entities';

export interface IAlbumRepository extends Repository<Album> {}
