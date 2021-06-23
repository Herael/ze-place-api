import * as mongoose from 'mongoose';

export const ImageSchema = new mongoose.Schema({
  name: String,
  url: String,
});

export const AvailabilitySchema = new mongoose.Schema({
  date: String,
  disabled: Boolean,
});
