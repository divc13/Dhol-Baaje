import { UserDto } from './user.dto';
import { TrackDto } from './track.dto';

export class TrackHistoryDto {
  id?: string;
  subjectId?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: UserDto;
  track?: TrackDto[];
}
