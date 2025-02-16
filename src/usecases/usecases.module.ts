import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { ReceivePaymentSlipUsecaseService } from './slip/receive-payment-slip-usecase/receive-payment-slip-usecase.service';

@Module({
  imports: [RepositoriesModule],
  providers: [ReceivePaymentSlipUsecaseService],
  exports: [ReceivePaymentSlipUsecaseService],
})
export class UsecasesModule {}
