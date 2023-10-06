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
import { Reorderprops } from '../entities';
import { ReorderpropsFlureeRepository } from '../repositories/fluree';
import { LogosphereError } from '@logosphere/sdk';
import { parseInfo } from '@logosphere/fluree';
import { ReorderpropsDto } from '../dto';
import { ReorderpropsDtoMap } from '../mappers/dto';

@Resolver(() => Reorderprops)
export class ReorderpropsResolver {
  constructor(
    private repo: ReorderpropsFlureeRepository,
    private mapper: ReorderpropsDtoMap
  ) {}

  @Query(() => [ReorderpropsDto])
  async reorderpropsFindAll(@Info() info: any): Promise<ReorderpropsDto[]> {
    return (await this.repo.findAll(parseInfo(info).info.selectionSetList)).map(
      (reorderprops: Reorderprops) => this.mapper.fromEntity(reorderprops)
    );
  }

  @Query(() => [ReorderpropsDto])
  async reorderpropsFindManyById(
    @Args({ name: 'idList', type: () => ID }) idList: string[],
    @Info() info: any
  ): Promise<ReorderpropsDto[]> {
    return (
      await this.repo.findManyById(
        idList,
        parseInfo(info).info.selectionSetList
      )
    ).map((reorderprops: Reorderprops) => this.mapper.fromEntity(reorderprops));
  }

  @Query(() => Boolean)
  async reorderpropsExists(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.repo.exists(id);
  }

  @Query(() => Reorderprops)
  async reorderpropsFindOneById(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Info() info: any
  ): Promise<ReorderpropsDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneById(id, parseInfo(info).info.selectionSetList)
    );
  }

  @Query(() => Reorderprops)
  async reorderpropsFindOneBySubjectId(
    @Args({ name: 'subjectId', type: () => String }) subjectId: string,
    @Info() info: any
  ): Promise<ReorderpropsDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneBySubjectId(
        subjectId,
        parseInfo(info).info.selectionSetList
      )
    );
  }

  @Mutation(() => ReorderpropsDto)
  async reorderpropsSave(
    @Args({ name: 'reorderprops', type: () => ReorderpropsDto })
    reorderprops: ReorderpropsDto,
    @Info() info: any
  ): Promise<ReorderpropsDto> {
    const reorderpropsEntity = this.mapper.toEntity(reorderprops);
    return this.mapper.fromEntity(
      await this.repo.save(
        reorderpropsEntity,
        parseInfo(info).info.selectionSetList
      )
    );
  }

  @Mutation(() => Boolean)
  async reorderpropsDelete(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.repo.delete(id);
  }
}
