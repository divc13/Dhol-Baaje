import { Reorderprops } from '../reorderprops.entity';

import { Track } from '../track.entity';

describe('Reorderprops Entity', () => {
  let reorderprops: Reorderprops;
  beforeAll(() => {
    const result = Reorderprops.create({});
    reorderprops = result.getValue();
  });

  it('should be defined', () => {
    expect(reorderprops).toBeDefined();
  });

  it('should have valid id', () => {
    expect(reorderprops.id).toBeDefined();
    expect(reorderprops.id).toHaveLength(64);
    expect(reorderprops.id).toMatch(/[A-Fa-f0-9]{64}/);
  });

  it('should have valid createdAt', () => {
    expect(reorderprops.createdAt).toBeDefined();
    expect(reorderprops.createdAt instanceof Date).toBeTruthy();
  });

  it('should have valid updatedAt', () => {
    expect(reorderprops.updatedAt).toBeDefined();
    expect(reorderprops.updatedAt instanceof Date).toBeTruthy();
  });
});
