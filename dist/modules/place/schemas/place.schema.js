"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceSchema = void 0;
const mongoose = require("mongoose");
const feature_schema_1 = require("../../feature/schemas/feature.schema");
const place_type_schema_1 = require("../../place-type/schemas/place-type.schema");
const review_schema_1 = require("../../review/schemas/review.schema");
const schemas_1 = require("../../schemas");
exports.PlaceSchema = new mongoose.Schema({
    title: String,
    aboutUser: String,
    location: {
        address: String,
        postalCode: String,
        city: String,
        country: String,
        longitude: String,
        latitude: String,
    },
    surface: String,
    placeType: [place_type_schema_1.PlaceTypeSchema],
    price: Number,
    rentingDuration: String,
    description: String,
    features: [feature_schema_1.FeatureSchema],
    images: [schemas_1.ImageSchema],
    authorizeAnimals: Boolean,
    authorizeMusic: Boolean,
    authorizeSmoking: Boolean,
    authorizeFire: Boolean,
    authorizeFoodAndDrink: Boolean,
    rate: Number,
    reviews: [review_schema_1.ReviewSchema],
    created_at: { type: Date, default: Date.now },
});
//# sourceMappingURL=place.schema.js.map