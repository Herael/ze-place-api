import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './modules/customer/customer.module';
import { PlaceModule } from './modules/place/place.module';
import { ReviewModule } from './modules/review/review.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/ze-place-api', {useNewUrlParser: true}),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost/ze-place-api',
      { useNewUrlParser: true, useFindAndModify: false },
    ),
    CustomerModule,
    PlaceModule,
    ReviewModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
