import { Reorderprops } from '../../../entities/reorderprops.entity';
import { ReorderpropsFlureeMap } from '../reorderprops.fluree.map';

describe('Reorderprops Fluree Map', () => {
  let reorderpropsData;
  let reorderprops: Reorderprops;
  let mapper: ReorderpropsFlureeMap;
  beforeAll(() => {
    reorderpropsData = {
      _id: 369435906932826,
      'reorderprops/identifier':
        '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
      'reorderprops/createdAt': 1657773127808,
      'reorderprops/updatedAt': 1657773127808,
      'reorderprops/list': [
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
      'reorderprops/startIndex': 1,
      'reorderprops/endIndex': 1,
    };
    mapper = new ReorderpropsFlureeMap();
  });

  it('should create Reorderprops entity from Fluree data', () => {
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

  it('should serialize Reorderprops to Fluree data', () => {
    const mappedData = mapper.fromEntity(reorderprops);
    expect(mappedData).toStrictEqual(reorderpropsData);
  });
});
