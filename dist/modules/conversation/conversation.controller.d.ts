import { ConversationService } from './conversation.service';
import { ConversationDTO } from './dto/conversation.dto';
export declare class ConversationController {
    private conversationService;
    constructor(conversationService: ConversationService);
    getAllConversation(res: any): Promise<any>;
    getConversationById(res: any, conversationID: any): Promise<any>;
    getConversationByPlaceId(res: any, placeId: any): Promise<any>;
    getConversationByUserId(res: any, userId: any): Promise<any>;
    createConversation(res: any, conversationDTO: ConversationDTO): Promise<any>;
    updateconversation(res: any, conversationID: any, conversationDTO: ConversationDTO): Promise<any>;
    deleteConversation(res: any, conversationId: any): Promise<any>;
}
