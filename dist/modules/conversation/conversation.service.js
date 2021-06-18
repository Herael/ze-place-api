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
    constructor(conversationModel, placeModel) {
        this.conversationModel = conversationModel;
        this.placeModel = placeModel;
    }
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
};
ConversationService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Conversation')),
    __param(1, mongoose_1.InjectModel('Place')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ConversationService);
exports.ConversationService = ConversationService;
//# sourceMappingURL=conversation.service.js.map