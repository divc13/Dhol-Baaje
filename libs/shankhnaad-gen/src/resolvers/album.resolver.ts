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
import { Album } from '../entities';
import { AlbumFlureeRepository } from '../repositories/fluree';
import { LogosphereError } from '@logosphere/sdk';
import { parseInfo } from '@logosphere/fluree';
import { AlbumDto } from '../dto';
import { AlbumDtoMap } from '../mappers/dto';
import { Genre } from '../shankhnaad.model';

@Resolver(() => Album)
export class AlbumResolver {
  constructor(
    private repo: AlbumFlureeRepository,
    private mapper: AlbumDtoMap
  ) {}

  @Query(() => [AlbumDto])
  async albumFindAll(@Info() info: any): Promise<AlbumDto[]> {
    return (await this.repo.findAll(parseInfo(info).info.selectionSetList)).map(
      (album: Album) => this.mapper.fromEntity(album)
    );
  }

  @Query(() => [AlbumDto])
  async albumFindManyById(
    @Args({ name: 'idList', type: () => ID }) idList: string[],
    @Info() info: any
  ): Promise<AlbumDto[]> {
    return (
      await this.repo.findManyById(
        idList,
        parseInfo(info).info.selectionSetList
      )
    ).map((album: Album) => this.mapper.fromEntity(album));
  }

  @Query(() => Boolean)
  async albumExists(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.repo.exists(id);
  }

  @Query(() => Album)
  async albumFindOneById(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Info() info: any
  ): Promise<AlbumDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneById(id, parseInfo(info).info.selectionSetList)
    );
  }

  @Query(() => Album)
  async albumFindOneBySubjectId(
    @Args({ name: 'subjectId', type: () => String }) subjectId: string,
    @Info() info: any
  ): Promise<AlbumDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneBySubjectId(
        subjectId,
        parseInfo(info).info.selectionSetList
      )
    );
  }

  @Mutation(() => AlbumDto)
  async albumSave(
    @Args({ name: 'album', type: () => AlbumDto }) album: AlbumDto,
    @Info() info: any
  ): Promise<AlbumDto> {
    const albumEntity = this.mapper.toEntity(album);
    return this.mapper.fromEntity(
      await this.repo.save(albumEntity, parseInfo(info).info.selectionSetList)
    );
  }

  @Mutation(() => Boolean)
  async albumDelete(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.repo.delete(id);
  }
}
