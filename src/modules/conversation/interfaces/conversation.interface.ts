import { Document } from 'mongoose';

export interface Conversation extends Document {
  placeId: string;
  userId: string;
  ownerId: string;
  created_at: Date;
}
