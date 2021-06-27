import * as mongoose from 'mongoose';

export const ConversationSchema = new mongoose.Schema({
  placeId: String,
  userId: String,
  ownerId: String,
  userSocketId: String,
  ownerSocketId: String,
  created_at: { type: Date, default: Date.now },
});
