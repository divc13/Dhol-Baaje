/* eslint-disable @typescript-eslint/no-empty-interface */
import { Injectable } from '@nestjs/common';
import {
  compile,
  ref,
  select,
  selectOne,
  create,
  update,
  remove,
  FlureeSingleObject,
  FlureeClient,
  gqlSelectionSetToFql,
  processUpdateTransactSpec,
  reconcileArrays,
} from '@logosphere/fluree';
import { copySubjectId, RepositoryError } from '@logosphere/sdk';

import { MyTracks } from '../../entities';
import { MyTracksFlureeMap } from '../../mappers/fluree';
import { IMyTracksRepository } from '../interfaces';

@Injectable()
export class MyTracksFlureeRepository implements IMyTracksRepository {
  constructor(
    private fluree: FlureeClient,
    private mapper: MyTracksFlureeMap
  ) {}

  public async exists(id: string): Promise<boolean> {
    const query = selectOne('myTracks/identifier')
      .where(`myTracks/identifier = '${id}'`)
      .build();
    const fql = compile(query);
    const result = await this.fluree.query(fql);
    return !!result && result['myTracks/identifier'] === id;
  }

  public async delete(id: string): Promise<boolean> {
    const existing = await this.findOneById(id);
    if (existing) {
      const transact = remove().id(+existing.subjectId).build();
      const response = await this.fluree.transact(transact);
      return response.status === 200;
    } else {
      return false;
    }
  }

  public async findAll(selectionSetList?: string[]): Promise<MyTracks[]> {
    const select = selectionSetList
      ? gqlSelectionSetToFql(selectionSetList)
      : ['*'];
    const fql = {
      select,
      from: 'myTracks',
    };
    const result = await this.fluree.query(fql);
    return result.map((f: FlureeSingleObject) => this.mapper.toEntity(f));
  }

  public async findManyById(
    idList: string[],
    selectionSetList?: string[]
  ): Promise<MyTracks[]> {
    if (!idList || idList.length === 0) {
      throw new RepositoryError('Empty array of ids for findManyById method');
    }

    let spec;
    if (idList.length > 0) {
      spec = select('*').where(`myTracks/identifier = '${idList[0]}'`);
      if (idList.length > 1) {
        idList.shift();
        idList.map((id: string) => {
          spec = spec.or(`myTracks/identifier = '${id}'`);
        });
      }
    }
    const fql = compile(spec.build());
    fql.select = selectionSetList
      ? gqlSelectionSetToFql(selectionSetList)
      : ['*'];
    const result = await this.fluree.query(fql);
    return result.map((f: FlureeSingleObject) => this.mapper.toEntity(f));
  }

  public async findOneById(
    id: string,
    selectionSetList?: string[]
  ): Promise<MyTracks> {
    const spec = selectOne('*').where(`myTracks/identifier = '${id}'`).build();
    const fql = compile(spec);
    fql.selectOne = selectionSetList
      ? gqlSelectionSetToFql(selectionSetList)
      : ['*'];
    const result = await this.fluree.query(fql);
    if (result) {
      return this.mapper.toEntity(result);
    } else {
      return null;
    }
  }

  public async findOneBySubjectId(
    subjectId: string,
    selectionSetList?: string[]
  ): Promise<MyTracks> {
    const spec = selectOne('*').from(+subjectId).build();
    const fql = compile(spec);
    fql.selectOne = selectionSetList
      ? gqlSelectionSetToFql(selectionSetList)
      : ['*'];
    const result = await this.fluree.query(fql);
    if (result) {
      return this.mapper.toEntity(result);
    } else {
      return null;
    }
  }

  public async save(
    myTracks: MyTracks,
    selectionSetList?: string[]
  ): Promise<MyTracks> {
    let spec;
    const data = this.mapper.fromEntity(myTracks);
    const existing = await this.findOneById(myTracks.id, selectionSetList);
    if (existing) {
      const existingData = this.mapper.fromEntity(existing);
      const resolvedData = copySubjectId(
        existingData,
        data,
        'identifier',
        '_id'
      );

      const updateTransact = [];
      const createTransact = [];

      processUpdateTransactSpec(
        update('myTracks').data(resolvedData).build(),
        updateTransact,
        createTransact
      );

      if (createTransact.length > 0) {
        const response = await this.fluree.transact(createTransact);

        if (response.status === 200) {
          console.log(
            'Dependent create transaction has completed successfully'
          );
        } else {
          console.log('Dependent create transaction failed');
          console.log(JSON.stringify(createTransact, null, 2));
        }
      }

      const existingSpec = [];
      processUpdateTransactSpec(
        update('myTracks').data(existingData).build(),
        existingSpec
      );
      spec = reconcileArrays(updateTransact, existingSpec);
    } else {
      data._id = `myTracks$${myTracks.id}`;
      spec = create('myTracks').data(data).build();
    }

    const response = await this.fluree.transact(
      JSON.parse(JSON.stringify(spec))
    );
    if (response.status === 200) {
      return await this.findOneById(myTracks.id, selectionSetList);
    } else {
      console.log('Transaction failed');
      console.log(JSON.stringify(spec, null, 2));
      return null;
    }
  }
}
