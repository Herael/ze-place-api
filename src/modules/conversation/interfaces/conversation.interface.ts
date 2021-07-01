import { Document } from 'mongoose';
import { Message } from 'src/modules/message/interfaces/message.interface';

export interface Conversation extends Document {
  placeId: string;
  userId: string;
  ownerId: string;
  lastMessage: Message;
  userAvatar: string;
  userName: string;
  ownerAvatar: string;
  ownerName: string;
  created_at: Date;
}
