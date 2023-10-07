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
      'track_history/user': {
        _id: 369435906932826,
        'user/identifier':
          '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
        'user/createdAt': 1657773127808,
        'user/updatedAt': 1657773127808,
        'user/username': 'babingo_whoelse@gmail.com',
        'user/wallet': {
          _id: 369435906932826,
          'wallet/identifier':
            '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
          'wallet/createdAt': 1657773127808,
          'wallet/updatedAt': 1657773127808,
          'wallet/name': 'Babingos wallet',
          'wallet/walletId': 'cd72843c95467883ccd6dafe227b91c96f071713',
          'wallet/address':
            'addr_test1qzsn8km55mp6cra7l20cymauks2fay8sqc3jr874mgmxpsa5mj4dvw5zrxmhauknj60c8tsf7x72ng0r8zmxa3necjlsgx9q6d',
          'wallet/publicKey':
            'a1f009e6f5770c7b10729f27237c7ccc677739e31119a69766664dee611220948234926b2c445c2e9e2ff40f22beafa193d7fedf72e5e877bffd606d33b6638c',
          'wallet/balance': 1,
          'wallet/assets': [
            {
              _id: 369435906932826,
              'walletAsset/identifier':
                '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
              'walletAsset/createdAt': 1657773127808,
              'walletAsset/updatedAt': 1657773127808,
              'walletAsset/name': '4269736f6e',
              'walletAsset/fingerprint':
                'asset12q7zh30hj2yme96wy8ms4fcdrwtep0auz8xqly',
              'walletAsset/policyId':
                '0b7018936bc41808ddabd96b4908b583195a0c252b5752ad38012bdb',
              'walletAsset/quantity': 1,
              'walletAsset/metadata': 'abcdefg',
              'walletAsset/assetSubjectId': '87960930223082',
              'walletAsset/logosphereId':
                '62c0ac76d6eebbf70828da57ea06c41a55001a2eb3cc929206d8f39abdbfaefc',
            },
          ],
        },
        'user/subscriptionEndDate': 'abcdefg',
      },
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
          'track/owner': {
            _id: 369435906932826,
            'user/identifier':
              '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
            'user/createdAt': 1657773127808,
            'user/updatedAt': 1657773127808,
            'user/username': 'babingo_whoelse@gmail.com',
            'user/wallet': {
              _id: 369435906932826,
              'wallet/identifier':
                '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
              'wallet/createdAt': 1657773127808,
              'wallet/updatedAt': 1657773127808,
              'wallet/name': 'Babingos wallet',
              'wallet/walletId': 'cd72843c95467883ccd6dafe227b91c96f071713',
              'wallet/address':
                'addr_test1qzsn8km55mp6cra7l20cymauks2fay8sqc3jr874mgmxpsa5mj4dvw5zrxmhauknj60c8tsf7x72ng0r8zmxa3necjlsgx9q6d',
              'wallet/publicKey':
                'a1f009e6f5770c7b10729f27237c7ccc677739e31119a69766664dee611220948234926b2c445c2e9e2ff40f22beafa193d7fedf72e5e877bffd606d33b6638c',
              'wallet/balance': 1,
              'wallet/assets': null,
            },
            'user/subscriptionEndDate': 'abcdefg',
          },
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
  });

  it('should serialize TrackHistory to Fluree data', () => {
    const mappedData = mapper.fromEntity(trackHistory);
    expect(mappedData).toStrictEqual(trackHistoryData);
  });
});
