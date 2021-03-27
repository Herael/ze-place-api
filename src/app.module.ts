import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './customer/customer.module';


@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/ze-place-api', {useNewUrlParser: true}),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost/ze-place-api', {useNewUrlParser: true, useFindAndModify: false}),
    CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
