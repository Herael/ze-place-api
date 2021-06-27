import { Model } from 'mongoose';
import { Customer } from '../customer/interfaces/customer.interface';
import { MessageDTO } from './dto/message.dto';
import { Message } from './interfaces/message.interface';
export declare class MessageService {
    private readonly messageModel;
    private readonly customerModel;
    constructor(messageModel: Model<Message>, customerModel: Model<Customer>);
    getAllMessage(): Promise<Message[]>;
    findById(messageID: string): Promise<Message>;
    findByConversationID(conversationId: string): Promise<Message[] | undefined>;
    addMessage(messageDTO: MessageDTO): Promise<Message>;
    deleteMessage(messageID: string): Promise<any>;
}
