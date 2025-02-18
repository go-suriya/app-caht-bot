import { Test, TestingModule } from '@nestjs/testing';
import { EasyslipRepositoryService } from './easyslip-repository.service';

describe('EasyslipRepositoryService', () => {
  let service: EasyslipRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EasyslipRepositoryService],
    }).compile();

    service = module.get<EasyslipRepositoryService>(EasyslipRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
