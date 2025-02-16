import { Test, TestingModule } from '@nestjs/testing';
import { SlipUserRepositoryService } from './slip-user-repository.service';

describe('SlipUserRepositoryService', () => {
  let service: SlipUserRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlipUserRepositoryService],
    }).compile();

    service = module.get<SlipUserRepositoryService>(SlipUserRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
