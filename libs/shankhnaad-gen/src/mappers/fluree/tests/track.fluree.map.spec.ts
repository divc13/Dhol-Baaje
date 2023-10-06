import { Track } from '../../../entities/track.entity';
import { TrackFlureeMap } from '../track.fluree.map';
import { Genre } from '../../../shankhnaad.model';

describe('Track Fluree Map', () => {
  let trackData;
  let track: Track;
  let mapper: TrackFlureeMap;
  beforeAll(() => {
    trackData = {
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
    };
    mapper = new TrackFlureeMap();
  });

  it('should create Track entity from Fluree data', () => {
    track = mapper.toEntity(trackData);
    expect(track.id).toBe(
      '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a'
    );
    expect(track.subjectId).toBe('369435906932826');
    expect(track.createdAt instanceof Date).toBeTruthy();
    expect(track.updatedAt instanceof Date).toBeTruthy();
    expect(track.key).toBe(1);
    expect(track.title).toBe('Song name');
    expect(track.subtitle).toBe('Some name');
    expect(track.music).toBe('123456789');
    expect(track.image).toBe('123456789');
    expect(track.likes).toBe(1);
    expect(track.n_listens).toBe(1);
    expect(track.description).toBe('a great song!!!');
    expect(track.album).toStrictEqual([Genre.Indie]);
    expect(track.value).toBe(1);
    expect(track.purchasable).toBe(1);
    expect(track.nftIpfsCid).toBe(
      'QmPrhyaEVcavi3XuP7WHBcD2n8xcUK6mGcF1u6AchXYbgn'
    );
    expect(track.nftCardanoTxId).toBe(
      '664274fa17646981774ac9a5ab5f79d4229788ee5d78bb6e3af351f9b25e2ac3'
    );
    expect(track.nftName).toBe('NFT Name');
    expect(track.nftDescription).toBe('NFT Description');
    expect(track.nftAssetName).toBe('NFT Asset Name');
  });

  it('should serialize Track to Fluree data', () => {
    const mappedData = mapper.fromEntity(track);
    expect(mappedData).toStrictEqual(trackData);
  });
});
