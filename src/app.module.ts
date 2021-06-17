import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerModule } from './modules/customer/customer.module';
import { PlaceModule } from './modules/place/place.module';
import { ReviewModule } from './modules/review/review.module';
import { AuthModule } from './modules/auth/auth.module';
import { PromoModule } from './modules/promo/promo.module';
import { PlaceTypeModule } from './modules/place-type/place-type.module';
import { FeatureModule } from './modules/feature/feature.module';
import { PaymentModule } from './modules/payment/payment.module';
import { BookingModule } from './modules/booking/booking.module';
import { AppGateway } from './app.gateway';
import { BugTicketModule } from './modules/bug-ticket/bug-ticket.module';
import { BugTicketService } from './modules/bug-ticket/bug-ticket.service';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/ze-place-api', {useNewUrlParser: true}),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost/ze-place-api',
      { useNewUrlParser: true, useFindAndModify: false },
    ),
    BookingModule,
    CustomerModule,
    PlaceModule,
    ReviewModule,
    AuthModule,
    PromoModule,
    PlaceTypeModule,
    FeatureModule,
    PaymentModule,
    BugTicketModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
