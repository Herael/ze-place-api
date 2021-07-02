"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargesSchema = void 0;
const mongoose = require("mongoose");
exports.ChargesSchema = new mongoose.Schema({
    value: Number,
    created_at: { type: Date, default: Date.now },
    name: String
});
//# sourceMappingURL=charges.schema.js.map