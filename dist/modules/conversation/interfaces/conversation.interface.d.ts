import { Document } from 'mongoose';
import { MessageDTO } from 'src/modules/message/dto/message.dto';
export interface Conversation extends Document {
    placeId: string;
    userId: string;
    ownerId: string;
    lastMessage: MessageDTO;
    userAvatar: string;
    userName: string;
    ownerAvatar: string;
    ownerName: string;
    created_at: Date;
}
