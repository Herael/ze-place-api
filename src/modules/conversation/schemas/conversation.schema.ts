import * as mongoose from 'mongoose';

export const ConversationSchema = new mongoose.Schema({
  placeId: String,
  senderId: String,
  ownerId: String,
  created_at: { type: Date, default: Date.now },
});
