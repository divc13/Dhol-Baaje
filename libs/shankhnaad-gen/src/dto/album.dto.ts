import { Genre } from '../enum-types';
import { TrackDto } from './track.dto';

export class AlbumDto {
  id?: string;
  subjectId?: string;
  createdAt?: string;
  updatedAt?: string;
  genre?: Genre;
  track?: TrackDto[];
}
