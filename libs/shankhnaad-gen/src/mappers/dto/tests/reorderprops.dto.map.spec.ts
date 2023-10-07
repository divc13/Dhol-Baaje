import { Reorderprops } from '../../../entities/reorderprops.entity';
import { ReorderpropsDto } from '../../../dto';
import { ReorderpropsDtoMap } from '../reorderprops.dto.map';

describe('Reorderprops Dto Map', () => {
  let reorderpropsData: ReorderpropsDto;
  let reorderprops: Reorderprops;
  let mapper: ReorderpropsDtoMap;
  beforeAll(() => {
    reorderpropsData = {
      subjectId: '369435906932826',
      id: '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
      createdAt: '2022-05-22T20:53:18.000Z',
      updatedAt: '2022-05-22T20:53:18.000Z',
      list: [
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
      startIndex: 1,
      endIndex: 1,
    };
    mapper = new ReorderpropsDtoMap();
  });

  it('should create Reorderprops entity from DTO data', () => {
    reorderprops = mapper.toEntity(reorderpropsData);
    expect(reorderprops.id).toBe(
      '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a'
    );
    expect(reorderprops.subjectId).toBe('369435906932826');
    expect(reorderprops.createdAt instanceof Date).toBeTruthy();
    expect(reorderprops.updatedAt instanceof Date).toBeTruthy();
    expect(reorderprops.startIndex).toBe(1);
    expect(reorderprops.endIndex).toBe(1);
  });

  it('should serialize Reorderprops to DTO data', () => {
    const mappedData = mapper.fromEntity(reorderprops);
    expect(mappedData).toStrictEqual(reorderpropsData);
  });
});
