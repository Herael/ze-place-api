"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.CustomerSchema = new Schema({
    avatar: String,
    first_name: String,
    last_name: String,
    birthdate: Date,
    phoneNumber: String,
    email: String,
    password: String,
    description: String,
    created_at: { type: Date, default: Date.now },
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
//# sourceMappingURL=customer.schema.js.map