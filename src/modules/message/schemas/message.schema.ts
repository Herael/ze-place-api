import * as mongoose from 'mongoose';
import { ConversationSchema } from 'src/modules/conversation/schemas/conversation.schema';
import { CustomerSchema } from 'src/modules/customer/schemas/customer.schema';

export const MessageSchema = new mongoose.Schema({
  conversation: ConversationSchema,
  sender: CustomerSchema,
  reciever: CustomerSchema,
  text: String,
  created_at: { type: Date, default: Date.now },
});
