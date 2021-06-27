"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureSchema = void 0;
const mongoose = require("mongoose");
exports.FeatureSchema = new mongoose.Schema({
    name: String,
    image: String,
    created_at: { type: Date, default: Date.now },
});
//# sourceMappingURL=feature.schema.js.map