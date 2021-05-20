import * as mongoose from 'mongoose';

export const PlaceTypeSchema = new mongoose.Schema({
  name: String,
  created_at: { type: Date, default: Date.now },
});
