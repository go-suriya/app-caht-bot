import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { RegisterGroupUsecaseService } from './line/register-group-usecase/register-group-usecase.service';
import { CreateSlipGroupUsecaseService } from './slip/create-slip-group-usecase/create-slip-group-usecase.service';
import { ReceivePaymentSlipUsecaseService } from './slip/receive-payment-slip-usecase/receive-payment-slip-usecase.service';

@Module({
  imports: [RepositoriesModule],
  providers: [
    ReceivePaymentSlipUsecaseService,
    CreateSlipGroupUsecaseService,
    RegisterGroupUsecaseService,
  ],
  exports: [
    ReceivePaymentSlipUsecaseService,
    CreateSlipGroupUsecaseService,
    RegisterGroupUsecaseService,
  ],
})
export class UsecasesModule {}
