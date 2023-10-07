import { Album } from '../../../entities/album.entity';
import { AlbumFlureeMap } from '../album.fluree.map';
import { Genre } from '../../../shankhnaad.model';

describe('Album Fluree Map', () => {
  let albumData;
  let album: Album;
  let mapper: AlbumFlureeMap;
  beforeAll(() => {
    albumData = {
      _id: 369435906932826,
      'album/identifier':
        '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
      'album/createdAt': 1657773127808,
      'album/updatedAt': 1657773127808,
      'album/genre': 'Indie',
      'album/track': [
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
    mapper = new AlbumFlureeMap();
  });

  it('should create Album entity from Fluree data', () => {
    album = mapper.toEntity(albumData);
    expect(album.id).toBe(
      '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a'
    );
    expect(album.subjectId).toBe('369435906932826');
    expect(album.createdAt instanceof Date).toBeTruthy();
    expect(album.updatedAt instanceof Date).toBeTruthy();
    expect(album.genre).toBe(Genre.Indie);
  });

  it('should serialize Album to Fluree data', () => {
    const mappedData = mapper.fromEntity(album);
    expect(mappedData).toStrictEqual(albumData);
  });
});
