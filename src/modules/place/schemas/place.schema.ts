import * as mongoose from 'mongoose';
import { ReviewSchema } from '../../review/schemas/review.schema';
import { ImageSchema } from '../../schemas';

export const PlaceSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  images: [ImageSchema],
  rate: Number,
  price: Number,
  reviews: [ReviewSchema],
  created_at: { type: Date, default: Date.now },
});
