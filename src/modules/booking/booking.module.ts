import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { CustomerSchema } from '../customer/schemas/customer.schema';
import { PlaceSchema } from '../place/schemas/place.schema';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingSchema } from './schemas/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
    MongooseModule.forFeature([{ name: 'Place', schema: PlaceSchema }]),
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
    ScheduleModule.forRoot(),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
