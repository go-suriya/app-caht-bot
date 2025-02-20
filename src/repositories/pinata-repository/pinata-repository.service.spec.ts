import { Test, TestingModule } from '@nestjs/testing';
import { PinataRepositoryService } from './pinata-repository.service';

describe('PinataRepositoryService', () => {
  let service: PinataRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PinataRepositoryService],
    }).compile();

    service = module.get<PinataRepositoryService>(PinataRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
