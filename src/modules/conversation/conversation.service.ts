import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Place } from '../place/interfaces/place.interface';
import { Conversation } from './interfaces/conversation.interface';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel('Conversation')
    private readonly conversationModel: Model<Conversation>,
    @InjectModel('Place')
    private readonly placeModel: Model<Place>,
  ) {}

  // async getConversation(userId, placeId) {}

  async sendMessage(userId, placeId, message) {
    const place = await this.placeModel.findOne({ _id: placeId });
    const conversation = await this.conversationModel.findOne({ placeId });
    if (!conversation) {
      conversation.placeId = placeId;
      conversation.senderId = userId;
      conversation.ownerId = place.ownerId;
    }
    conversation.messages.push({
      from: userId,
      to: place.ownerId,
      message: message,
      isRead: false,
    });
    console.log(conversation);
    conversation.save();
  }
}
