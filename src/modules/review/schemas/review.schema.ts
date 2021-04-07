import * as mongoose from 'mongoose';
import { CustomerSchema } from 'src/modules/customer/schemas/customer.schema';

export const ReviewSchema = new mongoose.Schema({
  from: CustomerSchema,
  text: String,
  rate: Number,
  created_at: { type: Date, default: Date.now },
});
