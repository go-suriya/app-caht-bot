import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { CreateSlipGroupUsecaseService } from './slip/create-slip-group-usecase/create-slip-group-usecase.service';
import { ReceivePaymentSlipUsecaseService } from './slip/receive-payment-slip-usecase/receive-payment-slip-usecase.service';

@Module({
  imports: [RepositoriesModule],
  providers: [ReceivePaymentSlipUsecaseService, CreateSlipGroupUsecaseService],
  exports: [ReceivePaymentSlipUsecaseService, CreateSlipGroupUsecaseService],
})
export class UsecasesModule {}
