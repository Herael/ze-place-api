import { Document } from 'mongoose';

export interface Conversation extends Document {
  placeId: string;
  userId: string;
  ownerId: string;
  userSocketId?: string;
  ownerSocketId?: string;
  created_at: Date;
}
