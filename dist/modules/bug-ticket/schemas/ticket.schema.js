"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketSchema = void 0;
const mongoose = require("mongoose");
const place_schema_1 = require("../../place/schemas/place.schema");
exports.TicketSchema = new mongoose.Schema({
    name: String,
    created_at: { type: Date, default: Date.now },
    senderId: String,
    description: String,
    tag: { type: String, default: 'In Progress' },
});
//# sourceMappingURL=ticket.schema.js.map