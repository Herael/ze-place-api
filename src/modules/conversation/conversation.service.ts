import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../customer/interfaces/customer.interface';
import { ConversationDTO } from './dto/conversation.dto';
import { Conversation } from './interfaces/conversation.interface';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel('Conversation')
    private readonly conversationModel: Model<Conversation>,
    @InjectModel('Customer')
    private readonly customerModel: Model<Customer>,
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
    const conversation = await this.conversationModel
      .findOne({
        $and: [
          { placeId: placeId },
          { $or: [{ ownerId: userId }, { userId: userId }] },
          { $or: [{ ownerId: ownerId }, { userId: ownerId }] },
        ],
      })
      .exec();
    return conversation;
  }

  async findByUserID(userId: string): Promise<Conversation[] | undefined> {
    console.log('service userId : ' + userId);
    const conversation = await this.conversationModel
      .find({ $or: [{ ownerId: userId }, { userId: userId }] })
      .exec();
    return conversation;
  }

  async addConversation(
    conversationDTO: ConversationDTO,
  ): Promise<Conversation> {
    const user = await this.customerModel.findById(conversationDTO.userId);
    const owner = await this.customerModel.findById(conversationDTO.ownerId);
    const conversation = {
      ...conversationDTO,
      userAvatar: user.avatar,
      userName: `${user.first_name} ${user.last_name}`,
      ownerAvatar: owner.avatar,
      ownerName: `${owner.first_name} ${owner.last_name}`,
    };
    return await new this.conversationModel(conversation).save();
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
