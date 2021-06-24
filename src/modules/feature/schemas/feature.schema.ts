import * as mongoose from 'mongoose';

export const FeatureSchema = new mongoose.Schema({
  name: String,
  imgage:String,
  created_at: { type: Date, default: Date.now },
});
