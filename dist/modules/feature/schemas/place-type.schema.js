"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceTypeSchema = void 0;
const mongoose = require("mongoose");
exports.PlaceTypeSchema = new mongoose.Schema({
    name: String,
    created_at: { type: Date, default: Date.now },
});
//# sourceMappingURL=place-type.schema.js.map