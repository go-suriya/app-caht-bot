import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { SlipUserEntity } from 'src/database/entities/slip/SlipUserEntity';
import { LineRepositoryService } from './line-repository/line-repository.service';
import { SlipUserRepositoryService } from './slip-user-repository/slip-user-repository.service';
import { SlipokRepositoryService } from './slipok-repository/slipok-repository.service';
import { SlipGroupEntity } from '../database/entities/slip/SlipGroupEntity';
import { SlipGroupRepositoryService } from './slip-group-repository/slip-group-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([SlipUserEntity, SlipGroupEntity]), DatabaseModule],
  providers: [
    LineRepositoryService,
    SlipokRepositoryService,
    SlipUserRepositoryService,
    SlipGroupRepositoryService,
  ],
  exports: [
    LineRepositoryService,
    SlipokRepositoryService,
    SlipUserRepositoryService,
    SlipGroupRepositoryService,
  ],
})
export class RepositoriesModule {
}
