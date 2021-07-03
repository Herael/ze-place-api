import * as mongoose from 'mongoose';


export const ChargesSchema = new mongoose.Schema({
  value:Number,
  created_at: { type: Date, default: Date.now },
  name:String
});
