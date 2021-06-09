import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { PlaceSchema } from './schemas/place.schema';
import { CustomerSchema } from '../customer/schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Place', schema: PlaceSchema }]),
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
  exports: [PlaceService],
})
export class PlaceModule {}
