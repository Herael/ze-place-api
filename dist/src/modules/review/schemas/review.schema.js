"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewSchema = void 0;
const mongoose = require("mongoose");
exports.ReviewSchema = new mongoose.Schema({
    created_at: { type: Date, default: Date.now },
});
//# sourceMappingURL=review.schema.js.map