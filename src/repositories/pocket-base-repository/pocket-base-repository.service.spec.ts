import { Test, TestingModule } from '@nestjs/testing';
import { PocketBaseRepositoryService } from './pocket-base-repository.service';

describe('PocketBaseRepositoryService', () => {
  let service: PocketBaseRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PocketBaseRepositoryService],
    }).compile();

    service = module.get<PocketBaseRepositoryService>(PocketBaseRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
