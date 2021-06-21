import { ConversationService } from './conversation.service';
export declare class ConversationController {
    private conversationService;
    constructor(conversationService: ConversationService);
    sendMessage(req: any, res: any, body: any): Promise<any>;
}
