import { Document } from 'mongoose';
export interface Promo extends Document {
    name: string;
    user_limit: number;
    end_date: Date;
}
