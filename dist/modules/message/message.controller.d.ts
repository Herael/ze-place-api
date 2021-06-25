import { MessageDTO } from './dto/message.dto';
import { MessageService } from './message.service';
export declare class MessageController {
    private messageService;
    constructor(messageService: MessageService);
    getAllMessage(res: any): Promise<any>;
    getMessageById(res: any, messageID: any): Promise<any>;
    getMessageByConversationId(res: any, conversationId: any): Promise<any>;
    createMessage(res: any, messageDTO: MessageDTO): Promise<any>;
    deleteMessage(res: any, messageId: any): Promise<any>;
}
