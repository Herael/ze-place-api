import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sendPushNotifications } from 'src/utils';
import { Customer } from '../customer/interfaces/customer.interface';
import { MessageDTO } from './dto/message.dto';
import { Message } from './interfaces/message.interface';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message')
    private readonly messageModel: Model<Message>,
    @InjectModel('Customer')
    private readonly customerModel: Model<Customer>,
  ) {}

  async getAllMessage(): Promise<Message[]> {
    const messages = await this.messageModel.find().exec();
    return messages;
  }

  async findById(messageID: string): Promise<Message> {
    const message = await this.messageModel.findById(messageID).exec();
    return message;
  }

  async findByConversationID(
    conversationId: string,
  ): Promise<Message[] | undefined> {
    const messages = await this.messageModel
      .find({ conversationId: conversationId })
      .exec();
    return messages;
  }

  async addMessage(messageDTO: MessageDTO): Promise<Message> {
    const receiver = await this.customerModel
      .findById(messageDTO.receiverId)
      .exec();
    sendPushNotifications({
      pushId: receiver.pushToken,
      title: 'Nouveau message',
      description: messageDTO.text,
    });
    return await new this.messageModel(messageDTO).save();
  }

  async deleteMessage(messageID: string): Promise<any> {
    const deletedMessage = await this.messageModel.findByIdAndRemove(messageID);
    return deletedMessage;
  }
}
