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
