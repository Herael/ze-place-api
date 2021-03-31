import * as mongoose from 'mongoose';

export const ReviewSchema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now },
});
