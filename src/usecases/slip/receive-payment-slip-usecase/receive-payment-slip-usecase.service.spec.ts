import { Test, TestingModule } from '@nestjs/testing';
import { ReceivePaymentSlipUsecaseService } from './receive-payment-slip-usecase.service';

describe('ReceivePaymentSlipUsecaseService', () => {
  let service: ReceivePaymentSlipUsecaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceivePaymentSlipUsecaseService],
    }).compile();

    service = module.get<ReceivePaymentSlipUsecaseService>(ReceivePaymentSlipUsecaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
