import * as mongoose from 'mongoose';
import { ReviewModule } from 'src/modules/review/review.module';

export const PlaceSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  images: [Image],
  rate: Number,
  price: Number,
  reviews: [ReviewModule],
  created_at: { type: Date, default: Date.now },
});
