import { MyTracks } from '../my-tracks.entity';

import { Track } from '../track.entity';

describe('MyTracks Entity', () => {
  let myTracks: MyTracks;
  beforeAll(() => {
    const result = MyTracks.create({});
    myTracks = result.getValue();
  });

  it('should be defined', () => {
    expect(myTracks).toBeDefined();
  });

  it('should have valid id', () => {
    expect(myTracks.id).toBeDefined();
    expect(myTracks.id).toHaveLength(64);
    expect(myTracks.id).toMatch(/[A-Fa-f0-9]{64}/);
  });

  it('should have valid createdAt', () => {
    expect(myTracks.createdAt).toBeDefined();
    expect(myTracks.createdAt instanceof Date).toBeTruthy();
  });

  it('should have valid updatedAt', () => {
    expect(myTracks.updatedAt).toBeDefined();
    expect(myTracks.updatedAt instanceof Date).toBeTruthy();
  });
});
