"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSchema = void 0;
const mongoose = require("mongoose");
const feature_schema_1 = require("../../feature/schemas/feature.schema");
exports.BookingSchema = new mongoose.Schema({
    userId: String,
    bookingPeriod: {
        startDate: String,
        endDate: String,
        duration: Number,
    },
    feature: feature_schema_1.FeatureSchema,
    description: String,
    created_at: { type: Date, default: Date.now },
});
//# sourceMappingURL=booking.schema.js.map