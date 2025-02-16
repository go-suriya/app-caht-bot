import { Test, TestingModule } from '@nestjs/testing';
import { LineRepositoryService } from './line-repository.service';

describe('LineRepositoryService', () => {
  let service: LineRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LineRepositoryService],
    }).compile();

    service = module.get<LineRepositoryService>(LineRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
