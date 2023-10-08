import { Album } from '../../../entities/album.entity';
import { AlbumDto } from '../../../dto';
import { AlbumDtoMap } from '../album.dto.map';
import { Genre } from '../../../shankhnaad.model';

describe('Album Dto Map', () => {
  let albumData: AlbumDto;
  let album: Album;
  let mapper: AlbumDtoMap;
  beforeAll(() => {
    albumData = {
      subjectId: '369435906932826',
      id: '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
      createdAt: '2022-05-22T20:53:18.000Z',
      updatedAt: '2022-05-22T20:53:18.000Z',
      genre: 'Indie',
      track: [
        {
          subjectId: '369435906932826',
          id: '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
          createdAt: '2022-05-22T20:53:18.000Z',
          updatedAt: '2022-05-22T20:53:18.000Z',
          key: 1,
          title: 'Song name',
          subtitle: 'Some name',
          username: 'abcdefg',
          music: '123456789',
          image: '123456789',
          likes: 1,
          n_listens: 1,
          description: 'a great song!!!',
          album: ['Indie'],
          value: 1,
          purchasable: 1,
          nftIpfsCid: 'QmPrhyaEVcavi3XuP7WHBcD2n8xcUK6mGcF1u6AchXYbgn',
          nftCardanoTxId:
            '664274fa17646981774ac9a5ab5f79d4229788ee5d78bb6e3af351f9b25e2ac3',
          nftName: 'NFT Name',
          nftDescription: 'NFT Description',
          nftAssetName: 'NFT Asset Name',
        },
      ],
    };
    mapper = new AlbumDtoMap();
  });

  it('should create Album entity from DTO data', () => {
    album = mapper.toEntity(albumData);
    expect(album.id).toBe(
      '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a'
    );
    expect(album.subjectId).toBe('369435906932826');
    expect(album.createdAt instanceof Date).toBeTruthy();
    expect(album.updatedAt instanceof Date).toBeTruthy();
    expect(album.genre).toBe(Genre.Indie);
  });

  it('should serialize Album to DTO data', () => {
    const mappedData = mapper.fromEntity(album);
    expect(mappedData).toStrictEqual(albumData);
  });
});
