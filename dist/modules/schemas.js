"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilitySchema = exports.ImageSchema = void 0;
const mongoose = require("mongoose");
exports.ImageSchema = new mongoose.Schema({
    name: String,
    url: String,
});
exports.AvailabilitySchema = new mongoose.Schema({
    userId: String,
    date: String,
    disabled: Boolean,
});
//# sourceMappingURL=schemas.js.map