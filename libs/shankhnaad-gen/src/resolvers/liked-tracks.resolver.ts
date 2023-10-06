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
import { LikedTracks } from '../entities';
import { LikedTracksFlureeRepository } from '../repositories/fluree';
import { LogosphereError } from '@logosphere/sdk';
import { parseInfo } from '@logosphere/fluree';
import { LikedTracksDto } from '../dto';
import { LikedTracksDtoMap } from '../mappers/dto';

@Resolver(() => LikedTracks)
export class LikedTracksResolver {
  constructor(
    private repo: LikedTracksFlureeRepository,
    private mapper: LikedTracksDtoMap
  ) {}

  @Query(() => [LikedTracksDto])
  async likedTracksFindAll(@Info() info: any): Promise<LikedTracksDto[]> {
    return (await this.repo.findAll(parseInfo(info).info.selectionSetList)).map(
      (likedTracks: LikedTracks) => this.mapper.fromEntity(likedTracks)
    );
  }

  @Query(() => [LikedTracksDto])
  async likedTracksFindManyById(
    @Args({ name: 'idList', type: () => ID }) idList: string[],
    @Info() info: any
  ): Promise<LikedTracksDto[]> {
    return (
      await this.repo.findManyById(
        idList,
        parseInfo(info).info.selectionSetList
      )
    ).map((likedTracks: LikedTracks) => this.mapper.fromEntity(likedTracks));
  }

  @Query(() => Boolean)
  async likedTracksExists(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.repo.exists(id);
  }

  @Query(() => LikedTracks)
  async likedTracksFindOneById(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Info() info: any
  ): Promise<LikedTracksDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneById(id, parseInfo(info).info.selectionSetList)
    );
  }

  @Query(() => LikedTracks)
  async likedTracksFindOneBySubjectId(
    @Args({ name: 'subjectId', type: () => String }) subjectId: string,
    @Info() info: any
  ): Promise<LikedTracksDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneBySubjectId(
        subjectId,
        parseInfo(info).info.selectionSetList
      )
    );
  }

  @Mutation(() => LikedTracksDto)
  async likedTracksSave(
    @Args({ name: 'likedTracks', type: () => LikedTracksDto })
    likedTracks: LikedTracksDto,
    @Info() info: any
  ): Promise<LikedTracksDto> {
    const likedTracksEntity = this.mapper.toEntity(likedTracks);
    return this.mapper.fromEntity(
      await this.repo.save(
        likedTracksEntity,
        parseInfo(info).info.selectionSetList
      )
    );
  }

  @Mutation(() => Boolean)
  async likedTracksDelete(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.repo.delete(id);
  }
}
