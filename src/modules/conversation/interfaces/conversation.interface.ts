import { Document } from 'mongoose';

export interface Conversation extends Document {
  placeId: string;
  senderId: string;
  ownerId: string;
  created_at: Date;
}
