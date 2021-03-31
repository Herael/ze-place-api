"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceSchema = void 0;
const mongoose = require("mongoose");
const review_module_1 = require("../../review/review.module");
exports.PlaceSchema = new mongoose.Schema({
    title: String,
    location: String,
    description: String,
    images: [Image],
    rate: Number,
    price: Number,
    reviews: [review_module_1.ReviewModule],
    created_at: { type: Date, default: Date.now },
});
//# sourceMappingURL=place.schema.js.map