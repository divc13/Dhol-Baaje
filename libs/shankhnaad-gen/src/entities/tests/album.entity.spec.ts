import { Album } from '../album.entity';
import { Genre } from '../../shankhnaad.model';

import { Track } from '../track.entity';

describe('Album Entity', () => {
  let album: Album;
  beforeAll(() => {
    const result = Album.create({});
    album = result.getValue();
  });

  it('should be defined', () => {
    expect(album).toBeDefined();
  });

  it('should have valid id', () => {
    expect(album.id).toBeDefined();
    expect(album.id).toHaveLength(64);
    expect(album.id).toMatch(/[A-Fa-f0-9]{64}/);
  });

  it('should have valid createdAt', () => {
    expect(album.createdAt).toBeDefined();
    expect(album.createdAt instanceof Date).toBeTruthy();
  });

  it('should have valid updatedAt', () => {
    expect(album.updatedAt).toBeDefined();
    expect(album.updatedAt instanceof Date).toBeTruthy();
  });
});
