import * as mongoose from 'mongoose';


export const PromoSchema = new mongoose.Schema({
   name: String,
   user_limit: Number,
   end_date: Date,
  });
  