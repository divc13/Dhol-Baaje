import { TrackDto } from './track.dto';

export class LikedTracksDto {
  id?: string;
  subjectId?: string;
  createdAt?: string;
  updatedAt?: string;
  username?: string;
  track?: TrackDto[];
}
