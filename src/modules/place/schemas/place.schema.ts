import * as mongoose from 'mongoose';
import { FeatureSchema } from 'src/modules/feature/schemas/feature.schema';
import { PlaceTypeSchema } from 'src/modules/place-type/schemas/place-type.schema';
import { ReviewSchema } from 'src/modules/review/schemas/review.schema';
import { ImageSchema } from 'src/modules/schemas';

export const PlaceSchema = new mongoose.Schema({
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
  placeType: [PlaceTypeSchema],
  price: Number,
  rentingDuration: String,
  description: String,
  features: [FeatureSchema],
  images: [ImageSchema],
  authorizeAnimals: Boolean,
  authorizeMusic: Boolean,
  authorizeSmoking: Boolean,
  authorizeFire: Boolean,
  authorizeFoodAndDrink: Boolean,
  rate: Number,
  reviews: [ReviewSchema],
  created_at: { type: Date, default: Date.now },
});
