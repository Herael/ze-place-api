import { Model } from 'mongoose';
import { ConversationDTO } from './dto/conversation.dto';
import { Conversation } from './interfaces/conversation.interface';
export declare class ConversationService {
    private readonly conversationModel;
    constructor(conversationModel: Model<Conversation>);
    getAllConversation(): Promise<Conversation[]>;
    findById(conversationID: string): Promise<Conversation>;
    findByPlaceID(placeId: string): Promise<Conversation | undefined>;
    findByUserID(userId: string): Promise<Conversation[] | undefined>;
    addConversation(conversationDTO: ConversationDTO): Promise<Conversation>;
    updateConversation(conversationID: string, createConversationDTO: ConversationDTO): Promise<Conversation>;
    deleteConversation(conversationID: string): Promise<any>;
}
