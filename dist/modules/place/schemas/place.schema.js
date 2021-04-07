"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceSchema = void 0;
const mongoose = require("mongoose");
const review_schema_1 = require("../../review/schemas/review.schema");
const schemas_1 = require("../../schemas");
exports.PlaceSchema = new mongoose.Schema({
    title: String,
    location: String,
    description: String,
    images: [schemas_1.ImageSchema],
    rate: Number,
    price: Number,
    reviews: [review_schema_1.ReviewSchema],
    created_at: { type: Date, default: Date.now },
});
//# sourceMappingURL=place.schema.js.map