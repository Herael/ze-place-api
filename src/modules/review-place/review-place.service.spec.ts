import { Test, TestingModule } from '@nestjs/testing';
import { ReviewPlaceService } from './review-place.service';

describe('ReviewService', () => {
  let service: ReviewPlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewPlaceService],
    }).compile();

    service = module.get<ReviewPlaceService>(ReviewPlaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
