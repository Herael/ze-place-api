import * as mongoose from 'mongoose';

import { FeatureSchema } from 'src/modules/feature/schemas/feature.schema';

export const BookingSchema = new mongoose.Schema({
  placeId: String,
  placeCover: String,
  placeTitle: String,
  ownerId: String,
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
  paymentId: String,
  isAccepted: { type: Boolean, default: false },
  isDenied: { type: Boolean, default: false },
  isPast: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});
