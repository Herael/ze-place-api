import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
  avatar: String,
  first_name: String,
  last_name: String,
  birthdate: Date,
  phoneNumber: String,
  email: String,
  password: String,
  description: String,
  created_at: { type: Date, default: Date.now },
});