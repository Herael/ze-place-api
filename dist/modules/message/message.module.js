"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("./message.service");
const message_controller_1 = require("./message.controller");
const mongoose_1 = require("@nestjs/mongoose");
const message_schema_1 = require("./schemas/message.schema");
const conversation_schema_1 = require("../conversation/schemas/conversation.schema");
const customer_schema_1 = require("../customer/schemas/customer.schema");
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Message', schema: message_schema_1.MessageSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: 'Conversation', schema: conversation_schema_1.ConversationSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Customer', schema: customer_schema_1.CustomerSchema }]),
        ],
        providers: [message_service_1.MessageService],
        controllers: [message_controller_1.MessageController],
    })
], MessageModule);
exports.MessageModule = MessageModule;
//# sourceMappingURL=message.module.js.map