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
          owner: {
            subjectId: '369435906932826',
            id: '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
            createdAt: '2022-05-22T20:53:18.000Z',
            updatedAt: '2022-05-22T20:53:18.000Z',
            username: 'babingo_whoelse@gmail.com',
            wallet: {
              subjectId: '369435906932826',
              id: '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
              createdAt: '2022-05-22T20:53:18.000Z',
              updatedAt: '2022-05-22T20:53:18.000Z',
              name: 'Babingos wallet',
              walletId: 'cd72843c95467883ccd6dafe227b91c96f071713',
              address:
                'addr_test1qzsn8km55mp6cra7l20cymauks2fay8sqc3jr874mgmxpsa5mj4dvw5zrxmhauknj60c8tsf7x72ng0r8zmxa3necjlsgx9q6d',
              publicKey:
                'a1f009e6f5770c7b10729f27237c7ccc677739e31119a69766664dee611220948234926b2c445c2e9e2ff40f22beafa193d7fedf72e5e877bffd606d33b6638c',
              balance: 1,
              assets: null,
            },
            subscriptionEndDate: 'abcdefg',
          },
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
