import { TrackHistory } from '../track-history.entity';

import { Track } from '../track.entity';

describe('TrackHistory Entity', () => {
  let trackHistory: TrackHistory;
  beforeAll(() => {
    const result = TrackHistory.create({});
    trackHistory = result.getValue();
  });

  it('should be defined', () => {
    expect(trackHistory).toBeDefined();
  });

  it('should have valid id', () => {
    expect(trackHistory.id).toBeDefined();
    expect(trackHistory.id).toHaveLength(64);
    expect(trackHistory.id).toMatch(/[A-Fa-f0-9]{64}/);
  });

  it('should have valid createdAt', () => {
    expect(trackHistory.createdAt).toBeDefined();
    expect(trackHistory.createdAt instanceof Date).toBeTruthy();
  });

  it('should have valid updatedAt', () => {
    expect(trackHistory.updatedAt).toBeDefined();
    expect(trackHistory.updatedAt instanceof Date).toBeTruthy();
  });
});
