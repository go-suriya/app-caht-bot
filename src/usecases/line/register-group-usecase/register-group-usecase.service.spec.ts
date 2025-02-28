import { Test, TestingModule } from '@nestjs/testing';
import { RegisterGroupUsecaseService } from './register-group-usecase.service';

describe('RegisterGroupUsecaseService', () => {
  let service: RegisterGroupUsecaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterGroupUsecaseService],
    }).compile();

    service = module.get<RegisterGroupUsecaseService>(RegisterGroupUsecaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
