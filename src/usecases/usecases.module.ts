import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import {
  ReceivePaymentSlipUsecaseService,
} from './slip/receive-payment-slip-usecase/receive-payment-slip-usecase.service';
import {
  CreateSlipGroupUsecaseService,
} from './slip-group/create-slip-group-usecase/create-slip-group-usecase.service';

@Module({
  imports: [RepositoriesModule],
  providers: [ReceivePaymentSlipUsecaseService, CreateSlipGroupUsecaseService],
  exports: [ReceivePaymentSlipUsecaseService, CreateSlipGroupUsecaseService],
})
export class UsecasesModule {
}
