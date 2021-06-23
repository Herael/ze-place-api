import { Test, TestingModule } from '@nestjs/testing';
import { ReviewPLaceController } from './review-place.controller';

describe('ReviewPlaceController', () => {
  let controller: ReviewPlaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewPlaceController],
    }).compile();

    controller = module.get<ReviewPlaceController>(ReviewPlaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
