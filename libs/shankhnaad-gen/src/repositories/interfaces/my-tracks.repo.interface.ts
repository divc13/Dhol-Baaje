/* eslint-disable @typescript-eslint/no-empty-interface */
import { Repository } from '@logosphere/sdk';
import { MyTracks } from '../../entities';

export interface IMyTracksRepository extends Repository<MyTracks> {}
