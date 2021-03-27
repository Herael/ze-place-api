"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSchema = void 0;
const mongoose = require("mongoose");
exports.CustomerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    address: String,
    description: String,
    created_at: { type: Date, default: Date.now }
});
//# sourceMappingURL=customer.schema.js.map