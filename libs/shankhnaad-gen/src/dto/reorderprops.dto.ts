import { TrackDto } from './track.dto';

export class ReorderpropsDto {
  id?: string;
  subjectId?: string;
  createdAt?: string;
  updatedAt?: string;
  list?: TrackDto[];
  startIndex?: number;
  endIndex?: number;
}
