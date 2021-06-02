import * as mongoose from 'mongoose';
import { FeatureSchema } from 'src/modules/feature/schemas/feature.schema';

export const BookingSchema = new mongoose.Schema({
  userId: String,
  bookingPeriod: {
    startDate: String,
    endDate: String,
    duration: Number,
  },
  feature: FeatureSchema,
  description: String,
  created_at: { type: Date, default: Date.now },
});
