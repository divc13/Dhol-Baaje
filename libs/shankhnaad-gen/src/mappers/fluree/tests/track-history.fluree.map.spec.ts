import { TrackHistory } from '../../../entities/track-history.entity';
import { TrackHistoryFlureeMap } from '../track-history.fluree.map';

describe('TrackHistory Fluree Map', () => {
  let trackHistoryData;
  let trackHistory: TrackHistory;
  let mapper: TrackHistoryFlureeMap;
  beforeAll(() => {
    trackHistoryData = {
      _id: 369435906932826,
      'track_history/identifier':
        '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
      'track_history/createdAt': 1657773127808,
      'track_history/updatedAt': 1657773127808,
      'track_history/username': 'abcdefg',
      'track_history/track': [
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
    mapper = new TrackHistoryFlureeMap();
  });

  it('should create TrackHistory entity from Fluree data', () => {
    trackHistory = mapper.toEntity(trackHistoryData);
    expect(trackHistory.id).toBe(
      '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a'
    );
    expect(trackHistory.subjectId).toBe('369435906932826');
    expect(trackHistory.createdAt instanceof Date).toBeTruthy();
    expect(trackHistory.updatedAt instanceof Date).toBeTruthy();
    expect(trackHistory.username).toBe('abcdefg');
  });

  it('should serialize TrackHistory to Fluree data', () => {
    const mappedData = mapper.fromEntity(trackHistory);
    expect(mappedData).toStrictEqual(trackHistoryData);
  });
});
