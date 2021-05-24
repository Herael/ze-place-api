"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSchema = void 0;
const mongoose = require("mongoose");
exports.CustomerSchema = new mongoose.Schema({
    avatar: String,
    first_name: String,
    last_name: String,
    birthdate: Date,
    phoneNumber: String,
    email: String,
    password: String,
    description: String,
    created_at: { type: Date, default: Date.now },
    promoCode: [String],
    historyCode: [String],
});
//# sourceMappingURL=customer.schema.js.map