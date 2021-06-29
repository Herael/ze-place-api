"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AppGateway = class AppGateway {
    constructor(conversationModel) {
        this.conversationModel = conversationModel;
        this.logger = new common_1.Logger('AppGateway');
        this.clientId = '';
    }
    async handleMessage(data) {
        const conversations = await this.conversationModel
            .find({ $or: [{ ownerId: data.userId }, { userId: data.userId }] })
            .exec();
        const formatConversations = conversations.map((conversation) => {
            if (conversation.userId === data.userId) {
                return Object.assign(Object.assign({}, conversation), { userSocketId: this.clientId });
            }
            else {
                return Object.assign(Object.assign({}, conversation), { ownerSocketId: this.clientId });
            }
        });
    }
    afterInit(server) {
        this.logger.log('Init');
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id}`);
        this.clientId = client.id;
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], AppGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('init_conversations'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleMessage", null);
AppGateway = __decorate([
    websockets_1.WebSocketGateway(),
    __param(0, mongoose_1.InjectModel('Conversation')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map