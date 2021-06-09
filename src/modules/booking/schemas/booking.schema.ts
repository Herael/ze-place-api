import * as mongoose from 'mongoose';

import { FeatureSchema } from 'src/modules/feature/schemas/feature.schema';

export const BookingSchema = new mongoose.Schema({
  userId: String,
  firstname: String,
  lastname: String,
  avatar: String,
  feature: FeatureSchema,
  startDate: String,
  endDate: String,
  duration: Number,
  price: Number,
  description: String,
  isAccepted: Boolean,
  created_at: { type: Date, default: Date.now },
});
