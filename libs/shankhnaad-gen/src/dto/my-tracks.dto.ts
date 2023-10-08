import { TrackDto } from './track.dto';

export class MyTracksDto {
  id?: string;
  subjectId?: string;
  createdAt?: string;
  updatedAt?: string;
  username?: string;
  track?: TrackDto[];
}
