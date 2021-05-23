import { Test, TestingModule } from '@nestjs/testing';
import { PlaceTypeController } from './place-type.controller';

describe('PlaceTypeController', () => {
  let controller: PlaceTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceTypeController],
    }).compile();

    controller = module.get<PlaceTypeController>(PlaceTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
