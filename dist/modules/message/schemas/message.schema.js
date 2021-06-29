"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const mongoose = require("mongoose");
const conversation_schema_1 = require("../../conversation/schemas/conversation.schema");
const customer_schema_1 = require("../../customer/schemas/customer.schema");
exports.MessageSchema = new mongoose.Schema({
    conversationId: String,
    senderId: String,
    receiverId: String,
    text: String,
    created_at: { type: Date, default: Date.now },
});
//# sourceMappingURL=message.schema.js.map