import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CustomerSchema = new Schema({
  avatar: String,
  first_name: String,
  last_name: String,
  birthdate: Date,
  phoneNumber: String,
  email: String,
  password: String,
  description: String,
  created_at: { type: Date, default: Date.now },
  promoCode: [String],
  historyCode: [String],
  favorites: [
    {
      _type: Schema.Types.ObjectId,
      get type() {
        return this._type;
      },
      set type(value) {
        this._type = value;
      },
      ref: 'places',
      default: [],
    },
  ],

});
