import { Test, TestingModule } from '@nestjs/testing';
import { MountainsService } from './mountains.service';

describe('MountainsService', () => {
  let service: MountainsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MountainsService],
    }).compile();

    service = module.get<MountainsService>(MountainsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
