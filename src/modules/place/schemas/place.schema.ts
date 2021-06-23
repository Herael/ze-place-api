import * as mongoose from 'mongoose';

import { BookingSchema } from 'src/modules/booking/schemas/booking.schema';
import { FeatureSchema } from 'src/modules/feature/schemas/feature.schema';
import { PlaceTypeSchema } from 'src/modules/place-type/schemas/place-type.schema';
import { ReviewSchema } from 'src/modules/review/schemas/review.schema';
import { AvailabilitySchema, ImageSchema } from 'src/modules/schemas';

export const PlaceSchema = new mongoose.Schema({
  title: String,
  location: {
    address: String,
    postalCode: String,
    city: String,
    country: String,
    longitude: String,
    latitude: String,
  },
  surface: Number,
  placeType: [PlaceTypeSchema],
  price: Number,
  description: String,
  features: [FeatureSchema],
  images: [ImageSchema],
  authorizeAnimals: Boolean,
  authorizeMusic: Boolean,
  authorizeSmoking: Boolean,
  authorizeFire: Boolean,
  authorizeFoodAndDrink: Boolean,
  ownerId: String,
  rate: Number,
  reviews: [ReviewSchema],
  bookings: [BookingSchema],
  isFavorite: Boolean,
  availabilities: [AvailabilitySchema],
  created_at: { type: Date, default: Date.now },
});
