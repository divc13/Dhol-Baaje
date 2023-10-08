import { MyTracks } from '../../../entities/my-tracks.entity';
import { MyTracksFlureeMap } from '../my-tracks.fluree.map';

describe('MyTracks Fluree Map', () => {
  let myTracksData;
  let myTracks: MyTracks;
  let mapper: MyTracksFlureeMap;
  beforeAll(() => {
    myTracksData = {
      _id: 369435906932826,
      'my_tracks/identifier':
        '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
      'my_tracks/createdAt': 1657773127808,
      'my_tracks/updatedAt': 1657773127808,
      'my_tracks/username': 'abcdefg',
      'my_tracks/track': [
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
    mapper = new MyTracksFlureeMap();
  });

  it('should create MyTracks entity from Fluree data', () => {
    myTracks = mapper.toEntity(myTracksData);
    expect(myTracks.id).toBe(
      '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a'
    );
    expect(myTracks.subjectId).toBe('369435906932826');
    expect(myTracks.createdAt instanceof Date).toBeTruthy();
    expect(myTracks.updatedAt instanceof Date).toBeTruthy();
    expect(myTracks.username).toBe('abcdefg');
  });

  it('should serialize MyTracks to Fluree data', () => {
    const mappedData = mapper.fromEntity(myTracks);
    expect(mappedData).toStrictEqual(myTracksData);
  });
});
