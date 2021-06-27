import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConversationDTO } from './dto/conversation.dto';
import { Conversation } from './interfaces/conversation.interface';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel('Conversation')
    private readonly conversationModel: Model<Conversation>,
  ) {}

  async getAllConversation(): Promise<Conversation[]> {
    const conversations = await this.conversationModel.find().exec();
    return conversations;
  }

  async findById(conversationID: string): Promise<Conversation> {
    const conversation = await this.conversationModel
      .findById(conversationID)
      .exec();
    return conversation;
  }

  async findByPlaceID(placeId: string): Promise<Conversation[] | undefined> {
    const conversation = await this.conversationModel
      .find({ placeId: placeId })
      .exec();
    return conversation;
  }

  async findByPlaceAndUser(
    placeId: string,
    userId: string,
    ownerId: string,
  ): Promise<Conversation | undefined> {
    console.log('Fetch');
    const conversation = await this.conversationModel
      .findOne({
        $and: [
          { placeId: placeId },
          { $or: [{ ownerId: userId }, { senderId: userId }] },
          { $or: [{ ownerId: ownerId }, { senderId: ownerId }] },
        ],
      })
      .exec();
    console.log(conversation);
    return conversation;
  }

  async findByUserID(userId: string): Promise<Conversation[] | undefined> {
    const conversation = await this.conversationModel
      .find({ $or: [{ ownerId: userId }, { senderId: userId }] })
      .exec();
    return conversation;
  }

  async addConversation(
    conversationDTO: ConversationDTO,
  ): Promise<Conversation> {
    return await new this.conversationModel(conversationDTO).save();
  }

  async updateConversation(
    conversationID: string,
    createConversationDTO: ConversationDTO,
  ): Promise<Conversation> {
    const updatedConversation = await this.conversationModel.findByIdAndUpdate(
      conversationID,
      createConversationDTO,
      { new: true },
    );
    return updatedConversation;
  }

  async deleteConversation(conversationID: string): Promise<any> {
    const deletedConversation = await this.conversationModel.findByIdAndRemove(
      conversationID,
    );
    return deletedConversation;
  }
}
