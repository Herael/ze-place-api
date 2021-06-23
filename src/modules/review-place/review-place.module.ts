import { Module } from '@nestjs/common';
import { ReviewPlaceService } from './review-place.service';
import { ReviewPlaceController } from './review-place.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewPlaceSchema } from './schemas/review-place.schema';
import { PlaceSchema } from '../place/schemas/place.schema';

@Module({

  imports: [
    MongooseModule.forFeature([{ name: 'ReviewPlace', schema: ReviewPlaceSchema }]),
    MongooseModule.forFeature([{ name: 'Place', schema: PlaceSchema }]),
  ],
  
  providers: [ReviewPlaceService],
  controllers: [ReviewPlaceController],
  exports: [ReviewPlaceService],

})
export class ReviewPLaceModule {}
