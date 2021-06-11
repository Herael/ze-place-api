import * as mongoose from 'mongoose';
import { PlaceSchema } from 'src/modules/place/schemas/place.schema';

export const CustomerSchema = new mongoose.Schema({
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
  favorites: [PlaceSchema],
  customerId: String,
  ownedPlaces: [PlaceSchema],
  bookings: [PlaceSchema],
  pushToken: String,
  created_at: { type: Date, default: Date.now },
});
