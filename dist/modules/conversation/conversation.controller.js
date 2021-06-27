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
exports.ConversationController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const conversation_service_1 = require("./conversation.service");
const conversation_dto_1 = require("./dto/conversation.dto");
let ConversationController = class ConversationController {
    constructor(conversationService) {
        this.conversationService = conversationService;
    }
    async getAllConversation(res) {
        const conversations = await this.conversationService.getAllConversation();
        return res.status(common_1.HttpStatus.OK).json(conversations);
    }
    async getConversationById(res, conversationID) {
        const conversation = await this.conversationService.findById(conversationID);
        if (!conversation)
            throw new common_1.NotFoundException('Conversation does not exist');
        return res.status(common_1.HttpStatus.OK).json(conversation);
    }
    async getConversationByPlaceId(res, placeId) {
        const conversation = await this.conversationService.findByPlaceID(placeId);
        if (!conversation)
            throw new common_1.NotFoundException('Conversation does not exist with this placeId !');
        return res.status(common_1.HttpStatus.OK).json(conversation);
    }
    async getConversationByPlaceAndUser(req, res) {
        const conversation = await this.conversationService.findByPlaceAndUser(req.body.placeId, req.body.userId, req.body.ownerId);
        if (!conversation)
            throw new common_1.NotFoundException('Conversation does not exist with this placeId !');
        return res.status(common_1.HttpStatus.OK).json(conversation);
    }
    async getConversationByUserId(res, userId) {
        const conversation = await this.conversationService.findByUserID(userId);
        if (!conversation)
            throw new common_1.NotFoundException('Any conversations exist with this userId for any sender or owner !');
        return res.status(common_1.HttpStatus.OK).json(conversation);
    }
    async createConversation(res, conversationDTO) {
        const conversation = await this.conversationService.addConversation(conversationDTO);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Conversation has been successfully created',
            conversation,
        });
    }
    async updateconversation(res, conversationID, conversationDTO) {
        const conversation = await this.conversationService.updateConversation(conversationID, conversationDTO);
        if (!conversation)
            throw new common_1.NotFoundException('Conversation does not exist');
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Conversation has been successfully updated',
            conversation,
        });
    }
    async deleteConversation(res, conversationId) {
        const conversation = await this.conversationService.deleteConversation(conversationId);
        if (!conversation)
            throw new common_1.NotFoundException('Conversation does not exist');
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Conversation has been successfully deleted',
            conversation,
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "getAllConversation", null);
__decorate([
    common_1.Get('/:conversationID'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('conversationID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "getConversationById", null);
__decorate([
    common_1.Get('/place/:placeID'),
    __param(0, common_1.Res()), __param(1, common_1.Param('placeID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "getConversationByPlaceId", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/place/user'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "getConversationByPlaceAndUser", null);
__decorate([
    common_1.Get('/user/:userID'),
    __param(0, common_1.Res()), __param(1, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "getConversationByUserId", null);
__decorate([
    common_1.Post('/create'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, conversation_dto_1.ConversationDTO]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "createConversation", null);
__decorate([
    common_1.Put('/update'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query('conversationID')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, conversation_dto_1.ConversationDTO]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "updateconversation", null);
__decorate([
    common_1.Delete('/delete'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query('conversationID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "deleteConversation", null);
ConversationController = __decorate([
    common_1.Controller('conversations'),
    __metadata("design:paramtypes", [conversation_service_1.ConversationService])
], ConversationController);
exports.ConversationController = ConversationController;
//# sourceMappingURL=conversation.controller.js.map