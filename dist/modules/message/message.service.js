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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const utils_1 = require("../../utils");
let MessageService = class MessageService {
    constructor(messageModel, customerModel) {
        this.messageModel = messageModel;
        this.customerModel = customerModel;
    }
    async getAllMessage() {
        const messages = await this.messageModel.find().exec();
        return messages;
    }
    async findById(messageID) {
        const message = await this.messageModel.findById(messageID).exec();
        return message;
    }
    async findByConversationID(conversationId) {
        const messages = await this.messageModel
            .find({ conversationId: conversationId })
            .exec();
        return messages;
    }
    async addMessage(messageDTO) {
        const receiver = await this.customerModel
            .findById(messageDTO.receiverId)
            .exec();
        utils_1.sendPushNotifications({
            pushId: receiver.pushToken,
            title: 'Nouveau message',
            description: messageDTO.text,
        });
        return await new this.messageModel(messageDTO).save();
    }
    async deleteMessage(messageID) {
        const deletedMessage = await this.messageModel.findByIdAndRemove(messageID);
        return deletedMessage;
    }
};
MessageService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Message')),
    __param(1, mongoose_1.InjectModel('Customer')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map