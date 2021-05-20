import * as mongoose from 'mongoose';

export const FeatureSchema = new mongoose.Schema({
  name: String,
  created_at: { type: Date, default: Date.now },
});
