import * as mongoose from 'mongoose';

export const PlaceTypeSchema = new mongoose.Schema({
  name: String,
  created_at: { type: Date, default: Date.now },
});

export const PlaceFeaturesSchema = new mongoose.Schema({
  name: String,
  image: String,
  created_at: { type: Date, default: Date.now },
});
