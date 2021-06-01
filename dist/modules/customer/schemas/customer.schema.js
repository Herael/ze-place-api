"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSchema = void 0;
const mongoose = require("mongoose");
const place_schema_1 = require("../../place/schemas/place.schema");
const Schema = mongoose.Schema;
exports.CustomerSchema = new Schema({
    avatar: String,
    first_name: String,
    last_name: String,
    birthdate: Date,
    phoneNumber: String,
    email: String,
    password: String,
    description: String,
    created_at: { type: Date, default: Date.now },
    promoCode: [String],
    historyCode: [String],
    favorites: [place_schema_1.PlaceSchema],
    customerId: String,
    ownedPlaces: [place_schema_1.PlaceSchema],
});
//# sourceMappingURL=customer.schema.js.map