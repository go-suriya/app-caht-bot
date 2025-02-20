import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryRepositoryService } from './cloudinary-repository.service';

describe('CloudinaryRepositoryService', () => {
  let service: CloudinaryRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudinaryRepositoryService],
    }).compile();

    service = module.get<CloudinaryRepositoryService>(CloudinaryRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
