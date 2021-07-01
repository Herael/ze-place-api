import * as mongoose from 'mongoose';
import { MessageSchema } from 'src/modules/message/schemas/message.schema';

export const ConversationSchema = new mongoose.Schema({
  placeId: String,
  userId: String,
  ownerId: String,
  lastMessage: MessageSchema,
  userAvatar: String,
  userName: String,
  ownerAvatar: String,
  ownerName: String,
  created_at: { type: Date, default: Date.now },
});
