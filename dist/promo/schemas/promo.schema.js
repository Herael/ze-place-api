"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoSchema = void 0;
const mongoose = require("mongoose");
exports.PromoSchema = new mongoose.Schema({
    name: String,
    user_limit: Number,
    end_date: Date,
});
//# sourceMappingURL=promo.schema.js.map