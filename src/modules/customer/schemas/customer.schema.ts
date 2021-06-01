import * as mongoose from 'mongoose';
import { PlaceSchema } from 'src/modules/place/schemas/place.schema';

const Schema = mongoose.Schema;

export const CustomerSchema = new Schema({
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
  favorites: [PlaceSchema],
  ownedPlaces: [PlaceSchema],
});
