import { Model } from 'mongoose';
import { MessageDTO } from './dto/message.dto';
import { Message } from './interfaces/message.interface';
export declare class MessageService {
    private readonly messageModel;
    constructor(messageModel: Model<Message>);
    getAllMessage(): Promise<Message[]>;
    findById(messageID: string): Promise<Message>;
    findByConversationID(conversationId: string): Promise<Message[] | undefined>;
    addMessage(messageDTO: MessageDTO): Promise<Message>;
    deleteMessage(messageID: string): Promise<any>;
}
