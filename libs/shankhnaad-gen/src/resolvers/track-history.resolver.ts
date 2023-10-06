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
import { TrackHistory } from '../entities';
import { TrackHistoryFlureeRepository } from '../repositories/fluree';
import { LogosphereError } from '@logosphere/sdk';
import { parseInfo } from '@logosphere/fluree';
import { TrackHistoryDto } from '../dto';
import { TrackHistoryDtoMap } from '../mappers/dto';

@Resolver(() => TrackHistory)
export class TrackHistoryResolver {
  constructor(
    private repo: TrackHistoryFlureeRepository,
    private mapper: TrackHistoryDtoMap
  ) {}

  @Query(() => [TrackHistoryDto])
  async trackHistoryFindAll(@Info() info: any): Promise<TrackHistoryDto[]> {
    return (await this.repo.findAll(parseInfo(info).info.selectionSetList)).map(
      (trackHistory: TrackHistory) => this.mapper.fromEntity(trackHistory)
    );
  }

  @Query(() => [TrackHistoryDto])
  async trackHistoryFindManyById(
    @Args({ name: 'idList', type: () => ID }) idList: string[],
    @Info() info: any
  ): Promise<TrackHistoryDto[]> {
    return (
      await this.repo.findManyById(
        idList,
        parseInfo(info).info.selectionSetList
      )
    ).map((trackHistory: TrackHistory) => this.mapper.fromEntity(trackHistory));
  }

  @Query(() => Boolean)
  async trackHistoryExists(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.repo.exists(id);
  }

  @Query(() => TrackHistory)
  async trackHistoryFindOneById(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Info() info: any
  ): Promise<TrackHistoryDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneById(id, parseInfo(info).info.selectionSetList)
    );
  }

  @Query(() => TrackHistory)
  async trackHistoryFindOneBySubjectId(
    @Args({ name: 'subjectId', type: () => String }) subjectId: string,
    @Info() info: any
  ): Promise<TrackHistoryDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneBySubjectId(
        subjectId,
        parseInfo(info).info.selectionSetList
      )
    );
  }

  @Mutation(() => TrackHistoryDto)
  async trackHistorySave(
    @Args({ name: 'trackHistory', type: () => TrackHistoryDto })
    trackHistory: TrackHistoryDto,
    @Info() info: any
  ): Promise<TrackHistoryDto> {
    const trackHistoryEntity = this.mapper.toEntity(trackHistory);
    return this.mapper.fromEntity(
      await this.repo.save(
        trackHistoryEntity,
        parseInfo(info).info.selectionSetList
      )
    );
  }

  @Mutation(() => Boolean)
  async trackHistoryDelete(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.repo.delete(id);
  }
}
