import { Test, TestingModule } from '@nestjs/testing';
import { MountainsController } from './mountains.controller';
import { MountainsService } from './mountains.service';

describe('MountainsController', () => {
  let controller: MountainsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MountainsController],
      providers: [MountainsService],
    }).compile();

    controller = module.get<MountainsController>(MountainsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
