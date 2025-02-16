import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SlipUserEntity } from 'src/database/entities/slip/SlipUserEntity';
import {
  FindManyOptions,
  FindOneOptions,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

@Injectable()
export class SlipUserRepositoryService {
  constructor(
    @InjectRepository(SlipUserEntity)
    private readonly slipUserRepository: Repository<SlipUserEntity>,
  ) {}

  async create(SlipUserEntity: SlipUserEntity): Promise<SlipUserEntity> {
    return await this.slipUserRepository.save(SlipUserEntity);
  }

  async findAll(
    options?: FindManyOptions<SlipUserEntity>,
  ): Promise<SlipUserEntity[]> {
    return await this.slipUserRepository.find(options);
  }

  async count(options?: FindManyOptions<SlipUserEntity>): Promise<number> {
    return await this.slipUserRepository.count(options);
  }

  async findOne(options: FindOneOptions<SlipUserEntity>) {
    return await this.slipUserRepository.findOne(options);
  }

  async update(id: string, body: SlipUserEntity) {
    return await this.slipUserRepository.update(id, body);
  }

  async delete(id: string) {
    return await this.slipUserRepository.delete(id);
  }

  async findAndCount(
    options?: FindManyOptions<SlipUserEntity>,
  ): Promise<[SlipUserEntity[], number]> {
    return await this.slipUserRepository.findAndCount(options);
  }

  createQueryBuilder(
    alias: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<SlipUserEntity> {
    return this.slipUserRepository.createQueryBuilder(alias);
  }
}
