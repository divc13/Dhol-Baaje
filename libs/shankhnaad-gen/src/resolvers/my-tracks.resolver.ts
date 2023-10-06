/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  Info,
  Context,
} from '@nestjs/graphql';
import { MyTracks } from '../entities';
import { MyTracksFlureeRepository } from '../repositories/fluree';
import { LogosphereError } from '@logosphere/sdk';
import { parseInfo } from '@logosphere/fluree';
import { MyTracksDto } from '../dto';
import { MyTracksDtoMap } from '../mappers/dto';

@Resolver(() => MyTracks)
export class MyTracksResolver {
  constructor(
    private repo: MyTracksFlureeRepository,
    private mapper: MyTracksDtoMap
  ) {}

  @Query(() => [MyTracksDto])
  async myTracksFindAll(@Info() info: any): Promise<MyTracksDto[]> {
    return (await this.repo.findAll(parseInfo(info).info.selectionSetList)).map(
      (myTracks: MyTracks) => this.mapper.fromEntity(myTracks)
    );
  }

  @Query(() => [MyTracksDto])
  async myTracksFindManyById(
    @Args({ name: 'idList', type: () => ID }) idList: string[],
    @Info() info: any
  ): Promise<MyTracksDto[]> {
    return (
      await this.repo.findManyById(
        idList,
        parseInfo(info).info.selectionSetList
      )
    ).map((myTracks: MyTracks) => this.mapper.fromEntity(myTracks));
  }

  @Query(() => Boolean)
  async myTracksExists(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.repo.exists(id);
  }

  @Query(() => MyTracks)
  async myTracksFindOneById(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Info() info: any
  ): Promise<MyTracksDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneById(id, parseInfo(info).info.selectionSetList)
    );
  }

  @Query(() => MyTracks)
  async myTracksFindOneBySubjectId(
    @Args({ name: 'subjectId', type: () => String }) subjectId: string,
    @Info() info: any
  ): Promise<MyTracksDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneBySubjectId(
        subjectId,
        parseInfo(info).info.selectionSetList
      )
    );
  }

  @Mutation(() => MyTracksDto)
  async myTracksSave(
    @Args({ name: 'myTracks', type: () => MyTracksDto }) myTracks: MyTracksDto,
    @Info() info: any
  ): Promise<MyTracksDto> {
    const myTracksEntity = this.mapper.toEntity(myTracks);
    return this.mapper.fromEntity(
      await this.repo.save(
        myTracksEntity,
        parseInfo(info).info.selectionSetList
      )
    );
  }

  @Mutation(() => Boolean)
  async myTracksDelete(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.repo.delete(id);
  }
}
