import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaceSchema } from '../place/schemas/place.schema';
import { ConversationSchema } from '../conversation/schemas/conversation.schema';
import { CustomerSchema } from '../customer/schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Conversation', schema: ConversationSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
    MongooseModule.forFeature([{ name: 'Place', schema: PlaceSchema }]),
  ],
  providers: [ConversationService],
  controllers: [ConversationController],
})
export class ConversationModule {}
