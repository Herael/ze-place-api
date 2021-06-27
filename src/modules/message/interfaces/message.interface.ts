import { Document } from 'mongoose';
import { Conversation } from 'src/modules/conversation/interfaces/conversation.interface';
import { Customer } from 'src/modules/customer/interfaces/customer.interface';

export interface Message extends Document {
  conversationId: string;
  senderId: string;
  receiverId: string;
  text: string;
  created_at: Date;
}
