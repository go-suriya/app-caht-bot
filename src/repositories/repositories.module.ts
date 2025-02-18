import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { SlipUserEntity } from 'src/database/entities/slip/SlipUserEntity';
import { SlipGroupEntity } from '../database/entities/slip/SlipGroupEntity';
import { EasyslipRepositoryService } from './easyslip-repository/easyslip-repository.service';
import { LineRepositoryService } from './line-repository/line-repository.service';
import { SlipGroupRepositoryService } from './slip-group-repository/slip-group-repository.service';
import { SlipUserRepositoryService } from './slip-user-repository/slip-user-repository.service';
import { Slip2goRepositoryService } from './slip2go-repository/slip2go-repository.service';
import { SlipokRepositoryService } from './slipok-repository/slipok-repository.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SlipUserEntity, SlipGroupEntity]),
    DatabaseModule,
  ],
  providers: [
    LineRepositoryService,
    SlipokRepositoryService,
    SlipUserRepositoryService,
    SlipGroupRepositoryService,
    Slip2goRepositoryService,
    Slip2goRepositoryService,
    EasyslipRepositoryService,
  ],
  exports: [
    LineRepositoryService,
    SlipokRepositoryService,
    SlipUserRepositoryService,
    SlipGroupRepositoryService,
    Slip2goRepositoryService,
    EasyslipRepositoryService,
  ],
})
export class RepositoriesModule {}
