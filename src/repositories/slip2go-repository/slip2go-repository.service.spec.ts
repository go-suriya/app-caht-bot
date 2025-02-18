import { Test, TestingModule } from '@nestjs/testing';
import { Slip2goRepositoryService } from './slip2go-repository.service';

describe('Slip2goRepositoryService', () => {
  let service: Slip2goRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Slip2goRepositoryService],
    }).compile();

    service = module.get<Slip2goRepositoryService>(Slip2goRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
