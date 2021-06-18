import { Document } from 'mongoose';
export interface Conversation extends Document {
    placeId: string;
    senderId: string;
    ownerId: string;
    messages: [
        {
            from: string;
            to: string;
            message: string;
            isRead: boolean;
        }
    ];
}
