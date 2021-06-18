import { Model } from 'mongoose';
import { Place } from '../place/interfaces/place.interface';
import { Conversation } from './interfaces/conversation.interface';
export declare class ConversationService {
    private readonly conversationModel;
    private readonly placeModel;
    constructor(conversationModel: Model<Conversation>, placeModel: Model<Place>);
    sendMessage(userId: any, placeId: any, message: any): Promise<void>;
}
