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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const message_dto_1 = require("./dto/message.dto");
const message_service_1 = require("./message.service");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async getAllMessage(res) {
        const messages = await this.messageService.getAllMessage();
        return res.status(common_1.HttpStatus.OK).json(messages);
    }
    async getMessageById(res, messageID) {
        const message = await this.messageService.findById(messageID);
        if (!message)
            throw new common_1.NotFoundException('Message does not exist');
        return res.status(common_1.HttpStatus.OK).json(message);
    }
    async getMessageByConversationId(res, conversationId) {
        const message = await this.messageService.findByConversationID(conversationId);
        if (!message)
            throw new common_1.NotFoundException('Message does not exist with this conversation !');
        return res.status(common_1.HttpStatus.OK).json(message);
    }
    async createMessage(res, messageDTO) {
        const messageAdded = await this.messageService.addMessage(messageDTO);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Message has been successfully created',
            messageAdded,
        });
    }
    async deleteMessage(res, messageId) {
        const messageDeleted = await this.messageService.deleteMessage(messageId);
        if (!messageDeleted)
            throw new common_1.NotFoundException('Message does not exist');
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Message has been successfully deleted',
            messageDeleted,
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getAllMessage", null);
__decorate([
    common_1.Get('/:messageID'),
    __param(0, common_1.Res()), __param(1, common_1.Param('messageID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessageById", null);
__decorate([
    common_1.Get('/:conversationID'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('conversationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessageByConversationId", null);
__decorate([
    common_1.Post('/create'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, message_dto_1.MessageDTO]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "createMessage", null);
__decorate([
    common_1.Delete('/delete'),
    __param(0, common_1.Res()), __param(1, common_1.Query('messageID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "deleteMessage", null);
MessageController = __decorate([
    common_1.Controller('message'),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map