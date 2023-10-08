import { TrackHistory } from '../../../entities/track-history.entity';
import { TrackHistoryDto } from '../../../dto';
import { TrackHistoryDtoMap } from '../track-history.dto.map';

describe('TrackHistory Dto Map', () => {
  let trackHistoryData: TrackHistoryDto;
  let trackHistory: TrackHistory;
  let mapper: TrackHistoryDtoMap;
  beforeAll(() => {
    trackHistoryData = {
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
    mapper = new TrackHistoryDtoMap();
  });

  it('should create TrackHistory entity from DTO data', () => {
    trackHistory = mapper.toEntity(trackHistoryData);
    expect(trackHistory.id).toBe(
      '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a'
    );
    expect(trackHistory.subjectId).toBe('369435906932826');
    expect(trackHistory.createdAt instanceof Date).toBeTruthy();
    expect(trackHistory.updatedAt instanceof Date).toBeTruthy();
    expect(trackHistory.username).toBe('abcdefg');
  });

  it('should serialize TrackHistory to DTO data', () => {
    const mappedData = mapper.fromEntity(trackHistory);
    expect(mappedData).toStrictEqual(trackHistoryData);
  });
});
