import { Test, TestingModule } from '@nestjs/testing';
import { SlipokRepositoryService } from './slipok-repository.service';

describe('SlipokRepositoryService', () => {
  let service: SlipokRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlipokRepositoryService],
    }).compile();

    service = module.get<SlipokRepositoryService>(SlipokRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
