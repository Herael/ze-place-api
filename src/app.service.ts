import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BookingService } from './modules/booking/booking.service';

@Injectable()
export class AppService {}
