import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schemas/message.schema';
import { ConversationSchema } from '../conversation/schemas/conversation.schema';
import { CustomerSchema } from '../customer/schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    MongooseModule.forFeature([
      { name: 'Conversation', schema: ConversationSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
  ],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
