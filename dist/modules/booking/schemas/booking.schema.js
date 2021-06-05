"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSchema = void 0;
const mongoose = require("mongoose");
const feature_schema_1 = require("../../feature/schemas/feature.schema");
exports.BookingSchema = new mongoose.Schema({
    userId: String,
    firstname: String,
    lastname: String,
    avatar: String,
    feature: feature_schema_1.FeatureSchema,
    startDate: String,
    endDate: String,
    duration: Number,
    price: Number,
    description: String,
    isAccepted: Boolean,
    created_at: { type: Date, default: Date.now },
});
//# sourceMappingURL=booking.schema.js.map