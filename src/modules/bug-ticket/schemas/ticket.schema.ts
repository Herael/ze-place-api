import * as mongoose from 'mongoose';
import { PlaceSchema } from 'src/modules/place/schemas/place.schema';

export const TicketSchema = new mongoose.Schema({
  name: String,
  created_at: { type: Date, default: Date.now },
  senderId: String,
  description:String,
  tag: { type: String, default: 'In Progress' },

});
