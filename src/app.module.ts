import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { CustomerModule } from './modules/customer/customer.module';
import { PlaceModule } from './modules/place/place.module';
import { ReviewPLaceModule } from './modules/review-place/review-place.module';
import { AuthModule } from './modules/auth/auth.module';
import { PromoModule } from './modules/promo/promo.module';
import { PlaceTypeModule } from './modules/place-type/place-type.module';
import { FeatureModule } from './modules/feature/feature.module';
import { PaymentModule } from './modules/payment/payment.module';
import { BookingModule } from './modules/booking/booking.module';
import { AppGateway } from './app.gateway';
import { BugTicketModule } from './modules/bug-ticket/bug-ticket.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { MessageModule } from './modules/message/message.module';
import { ConversationSchema } from './modules/conversation/schemas/conversation.schema';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/ze-place-api', {useNewUrlParser: true}),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost/ze-place-api',
      { useNewUrlParser: true, useFindAndModify: false },
    ),
    MongooseModule.forFeature([
      { name: 'Conversation', schema: ConversationSchema },
    ]),
    CustomerModule,
    PlaceModule,
    ReviewPLaceModule,
    AuthModule,
    PromoModule,
    PlaceTypeModule,
    FeatureModule,
    PaymentModule,
    BugTicketModule,
    ConversationModule,
    ScheduleModule.forRoot(),
    BookingModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
