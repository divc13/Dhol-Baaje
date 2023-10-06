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

import { TrackHistory } from '../../entities';
import { TrackHistoryFlureeMap } from '../../mappers/fluree';
import { ITrackHistoryRepository } from '../interfaces';

@Injectable()
export class TrackHistoryFlureeRepository implements ITrackHistoryRepository {
  constructor(
    private fluree: FlureeClient,
    private mapper: TrackHistoryFlureeMap
  ) {}

  public async exists(id: string): Promise<boolean> {
    const query = selectOne('trackHistory/identifier')
      .where(`trackHistory/identifier = '${id}'`)
      .build();
    const fql = compile(query);
    const result = await this.fluree.query(fql);
    return !!result && result['trackHistory/identifier'] === id;
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

  public async findAll(selectionSetList?: string[]): Promise<TrackHistory[]> {
    const select = selectionSetList
      ? gqlSelectionSetToFql(selectionSetList)
      : ['*'];
    const fql = {
      select,
      from: 'trackHistory',
    };
    const result = await this.fluree.query(fql);
    return result.map((f: FlureeSingleObject) => this.mapper.toEntity(f));
  }

  public async findManyById(
    idList: string[],
    selectionSetList?: string[]
  ): Promise<TrackHistory[]> {
    if (!idList || idList.length === 0) {
      throw new RepositoryError('Empty array of ids for findManyById method');
    }

    let spec;
    if (idList.length > 0) {
      spec = select('*').where(`trackHistory/identifier = '${idList[0]}'`);
      if (idList.length > 1) {
        idList.shift();
        idList.map((id: string) => {
          spec = spec.or(`trackHistory/identifier = '${id}'`);
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
  ): Promise<TrackHistory> {
    const spec = selectOne('*')
      .where(`trackHistory/identifier = '${id}'`)
      .build();
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
  ): Promise<TrackHistory> {
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
    trackHistory: TrackHistory,
    selectionSetList?: string[]
  ): Promise<TrackHistory> {
    let spec;
    const data = this.mapper.fromEntity(trackHistory);
    const existing = await this.findOneById(trackHistory.id, selectionSetList);
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
        update('trackHistory').data(resolvedData).build(),
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
        update('trackHistory').data(existingData).build(),
        existingSpec
      );
      spec = reconcileArrays(updateTransact, existingSpec);
    } else {
      data._id = `trackHistory$${trackHistory.id}`;
      spec = create('trackHistory').data(data).build();
    }

    const response = await this.fluree.transact(
      JSON.parse(JSON.stringify(spec))
    );
    if (response.status === 200) {
      return await this.findOneById(trackHistory.id, selectionSetList);
    } else {
      console.log('Transaction failed');
      console.log(JSON.stringify(spec, null, 2));
      return null;
    }
  }
}
