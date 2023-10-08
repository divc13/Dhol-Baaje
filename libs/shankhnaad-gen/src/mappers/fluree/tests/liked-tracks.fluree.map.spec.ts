import { LikedTracks } from '../../../entities/liked-tracks.entity';
import { LikedTracksFlureeMap } from '../liked-tracks.fluree.map';

describe('LikedTracks Fluree Map', () => {
  let likedTracksData;
  let likedTracks: LikedTracks;
  let mapper: LikedTracksFlureeMap;
  beforeAll(() => {
    likedTracksData = {
      _id: 369435906932826,
      'liked_tracks/identifier':
        '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
      'liked_tracks/createdAt': 1657773127808,
      'liked_tracks/updatedAt': 1657773127808,
      'liked_tracks/username': 'abcdefg',
      'liked_tracks/track': [
        {
          _id: 369435906932826,
          'track/identifier':
            '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
          'track/createdAt': 1657773127808,
          'track/updatedAt': 1657773127808,
          'track/key': 1,
          'track/title': 'Song name',
          'track/subtitle': 'Some name',
          'track/username': 'abcdefg',
          'track/music': '123456789',
          'track/image': '123456789',
          'track/likes': 1,
          'track/n_listens': 1,
          'track/description': 'a great song!!!',
          'track/album': ['Indie'],
          'track/value': 1,
          'track/purchasable': 1,
          'track/nftIpfsCid': 'QmPrhyaEVcavi3XuP7WHBcD2n8xcUK6mGcF1u6AchXYbgn',
          'track/nftCardanoTxId':
            '664274fa17646981774ac9a5ab5f79d4229788ee5d78bb6e3af351f9b25e2ac3',
          'track/nftName': 'NFT Name',
          'track/nftDescription': 'NFT Description',
          'track/nftAssetName': 'NFT Asset Name',
        },
      ],
    };
    mapper = new LikedTracksFlureeMap();
  });

  it('should create LikedTracks entity from Fluree data', () => {
    likedTracks = mapper.toEntity(likedTracksData);
    expect(likedTracks.id).toBe(
      '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a'
    );
    expect(likedTracks.subjectId).toBe('369435906932826');
    expect(likedTracks.createdAt instanceof Date).toBeTruthy();
    expect(likedTracks.updatedAt instanceof Date).toBeTruthy();
    expect(likedTracks.username).toBe('abcdefg');
  });

  it('should serialize LikedTracks to Fluree data', () => {
    const mappedData = mapper.fromEntity(likedTracks);
    expect(mappedData).toStrictEqual(likedTracksData);
  });
});
