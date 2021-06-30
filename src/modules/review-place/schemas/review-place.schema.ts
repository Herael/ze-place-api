import * as mongoose from 'mongoose';
import { CustomerSchema } from 'src/modules/customer/schemas/customer.schema';

export const ReviewPlaceSchema = new mongoose.Schema({
   name: String,
   description: String,
   writerId: String,
   writerName: String,
   placeId: String,
   rate: Number,
  created_at: { type: Date, default: Date.now },
});
