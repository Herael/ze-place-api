"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewPlaceSchema = void 0;
const mongoose = require("mongoose");
const customer_schema_1 = require("../../customer/schemas/customer.schema");
exports.ReviewPlaceSchema = new mongoose.Schema({
    name: String,
    description: String,
    writerId: String,
    placeId: String,
    rate: Number,
    created_at: { type: Date, default: Date.now },
});
//# sourceMappingURL=review-place.schema.js.map