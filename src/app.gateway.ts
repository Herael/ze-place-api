import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from './modules/conversation/interfaces/conversation.interface';
import { Model } from 'mongoose';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectModel('Conversation')
    private readonly conversationModel: Model<Conversation>,
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  private clientId = '';

  @SubscribeMessage('init_conversations')
  async handleMessage(@MessageBody() data: any) {
    const conversations = await this.conversationModel
      .find({ $or: [{ ownerId: data.userId }, { userId: data.userId }] })
      .exec();
    const formatConversations = conversations.map((conversation) => {
      if (conversation.userId === data.userId) {
        return {
          ...conversation,
          userSocketId: this.clientId,
        };
      } else {
        return {
          ...conversation,
          ownerSocketId: this.clientId,
        };
      }
    });
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    this.clientId = client.id;
  }
}
