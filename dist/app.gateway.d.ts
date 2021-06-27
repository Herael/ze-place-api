import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Conversation } from './modules/conversation/interfaces/conversation.interface';
import { Model } from 'mongoose';
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly conversationModel;
    constructor(conversationModel: Model<Conversation>);
    server: Server;
    private logger;
    private clientId;
    handleMessage(data: any): Promise<void>;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}
