import { LikedTracks } from '../liked-tracks.entity';

import { Track } from '../track.entity';

describe('LikedTracks Entity', () => {
  let likedTracks: LikedTracks;
  beforeAll(() => {
    const result = LikedTracks.create({});
    likedTracks = result.getValue();
  });

  it('should be defined', () => {
    expect(likedTracks).toBeDefined();
  });

  it('should have valid id', () => {
    expect(likedTracks.id).toBeDefined();
    expect(likedTracks.id).toHaveLength(64);
    expect(likedTracks.id).toMatch(/[A-Fa-f0-9]{64}/);
  });

  it('should have valid createdAt', () => {
    expect(likedTracks.createdAt).toBeDefined();
    expect(likedTracks.createdAt instanceof Date).toBeTruthy();
  });

  it('should have valid updatedAt', () => {
    expect(likedTracks.updatedAt).toBeDefined();
    expect(likedTracks.updatedAt instanceof Date).toBeTruthy();
  });
});
