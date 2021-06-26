"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationSchema = void 0;
const mongoose = require("mongoose");
exports.ConversationSchema = new mongoose.Schema({
    placeId: String,
    senderId: String,
    ownerId: String,
    created_at: { type: Date, default: Date.now },
});
//# sourceMappingURL=conversation.schema.js.map