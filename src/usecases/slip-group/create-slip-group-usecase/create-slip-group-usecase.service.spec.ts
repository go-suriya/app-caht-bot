import { Test, TestingModule } from '@nestjs/testing';
import { CreateSlipGroupUsecaseService } from './create-slip-group-usecase.service';

describe('CreateSlipGroupUsecaseService', () => {
  let service: CreateSlipGroupUsecaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateSlipGroupUsecaseService],
    }).compile();

    service = module.get<CreateSlipGroupUsecaseService>(CreateSlipGroupUsecaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
