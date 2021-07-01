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
exports.ConversationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ConversationService = class ConversationService {
    constructor(conversationModel, customerModel) {
        this.conversationModel = conversationModel;
        this.customerModel = customerModel;
    }
    async getAllConversation() {
        const conversations = await this.conversationModel.find().exec();
        return conversations;
    }
    async findById(conversationID) {
        const conversation = await this.conversationModel
            .findById(conversationID)
            .exec();
        return conversation;
    }
    async findByPlaceID(placeId) {
        const conversation = await this.conversationModel
            .find({ placeId: placeId })
            .exec();
        return conversation;
    }
    async findByPlaceAndUser(placeId, userId, ownerId) {
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
    async findByUserID(userId) {
        const conversation = await this.conversationModel
            .find({ $or: [{ ownerId: userId }, { senderId: userId }] })
            .exec();
        return conversation;
    }
    async addConversation(conversationDTO) {
        const user = await this.customerModel.findById(conversationDTO.userId);
        const owner = await this.customerModel.findById(conversationDTO.ownerId);
        const conversation = Object.assign(Object.assign({}, conversationDTO), { userAvatar: user.avatar, userName: `${user.first_name} ${user.last_name}`, ownerAvatar: owner.avatar, ownerName: `${owner.first_name} ${owner.last_name}` });
        return await new this.conversationModel(conversation).save();
    }
    async updateConversation(conversationID, createConversationDTO) {
        const updatedConversation = await this.conversationModel.findByIdAndUpdate(conversationID, createConversationDTO, { new: true });
        return updatedConversation;
    }
    async deleteConversation(conversationID) {
        const deletedConversation = await this.conversationModel.findByIdAndRemove(conversationID);
        return deletedConversation;
    }
};
ConversationService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Conversation')),
    __param(1, mongoose_1.InjectModel('Customer')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ConversationService);
exports.ConversationService = ConversationService;
//# sourceMappingURL=conversation.service.js.map