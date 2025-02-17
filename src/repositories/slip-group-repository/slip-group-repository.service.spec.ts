import { Test, TestingModule } from '@nestjs/testing';
import { SlipGroupRepositoryService } from './slip-group-repository.service';

describe('SlipGroupRepositoryService', () => {
  let service: SlipGroupRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlipGroupRepositoryService],
    }).compile();

    service = module.get<SlipGroupRepositoryService>(SlipGroupRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
