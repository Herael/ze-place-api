import { Document } from 'mongoose';
export interface Message extends Document {
    conversationId: string;
    senderId: string;
    text: string;
    created_at: Date;
}
