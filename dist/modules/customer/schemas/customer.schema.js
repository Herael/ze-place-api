"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSchema = void 0;
const mongoose = require("mongoose");
const place_schema_1 = require("../../place/schemas/place.schema");
exports.CustomerSchema = new mongoose.Schema({
    avatar: String,
    first_name: String,
    last_name: String,
    birthdate: Date,
    phoneNumber: String,
    email: String,
    password: String,
    description: String,
    promoCode: [String],
    historyCode: [String],
    favorites: [place_schema_1.PlaceSchema],
    customerId: String,
    ownedPlaces: [place_schema_1.PlaceSchema],
    bookings: [place_schema_1.PlaceSchema],
    pushToken: String,
    stripeAccount: String,
    gender: String,
    IDRecto: String,
    IDVerso: String,
    location: {
        address: String,
        postalCode: String,
        city: String,
        country: String,
        longitude: Number,
        latitude: Number,
    },
    created_at: { type: Date, default: Date.now },
});
//# sourceMappingURL=customer.schema.js.map