import { MyTracks } from '../../../entities/my-tracks.entity';
import { MyTracksDto } from '../../../dto';
import { MyTracksDtoMap } from '../my-tracks.dto.map';

describe('MyTracks Dto Map', () => {
  let myTracksData: MyTracksDto;
  let myTracks: MyTracks;
  let mapper: MyTracksDtoMap;
  beforeAll(() => {
    myTracksData = {
      subjectId: '369435906932826',
      id: '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
      createdAt: '2022-05-22T20:53:18.000Z',
      updatedAt: '2022-05-22T20:53:18.000Z',
      username: 'abcdefg',
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
    mapper = new MyTracksDtoMap();
  });

  it('should create MyTracks entity from DTO data', () => {
    myTracks = mapper.toEntity(myTracksData);
    expect(myTracks.id).toBe(
      '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a'
    );
    expect(myTracks.subjectId).toBe('369435906932826');
    expect(myTracks.createdAt instanceof Date).toBeTruthy();
    expect(myTracks.updatedAt instanceof Date).toBeTruthy();
    expect(myTracks.username).toBe('abcdefg');
  });

  it('should serialize MyTracks to DTO data', () => {
    const mappedData = mapper.fromEntity(myTracks);
    expect(mappedData).toStrictEqual(myTracksData);
  });
});
