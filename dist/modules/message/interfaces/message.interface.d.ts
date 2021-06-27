import { Document } from 'mongoose';
export interface Message extends Document {
    conversationId: string;
    senderId: string;
    receiverId: string;
    text: string;
    created_at: Date;
}
