"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationSchema = void 0;
const mongoose = require("mongoose");
const message_schema_1 = require("../../message/schemas/message.schema");
exports.ConversationSchema = new mongoose.Schema({
    placeId: String,
    userId: String,
    ownerId: String,
    lastMessage: message_schema_1.MessageSchema,
    userAvatar: String,
    userName: String,
    ownerAvatar: String,
    ownerName: String,
    created_at: { type: Date, default: Date.now },
});
//# sourceMappingURL=conversation.schema.js.map