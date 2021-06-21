import * as mongoose from 'mongoose';

export const ConversationSchema = new mongoose.Schema({
  placeId: String,
  senderId: String,
  ownerId: String,
  messages: [
    {
      from: String,
      to: String,
      message: String,
      isRead: Boolean,
      created_at: { type: Date, default: Date.now },
    },
  ],
  created_at: { type: Date, default: Date.now },
});
