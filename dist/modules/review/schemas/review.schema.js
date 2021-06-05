"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewSchema = void 0;
const mongoose = require("mongoose");
const customer_schema_1 = require("../../customer/schemas/customer.schema");
exports.ReviewSchema = new mongoose.Schema({
    text: String,
    rate: Number,
    created_at: { type: Date, default: Date.now },
});
//# sourceMappingURL=review.schema.js.map