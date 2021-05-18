import { Document } from 'mongoose';
export interface Customer extends Document {
    readonly avatar: string;
    readonly first_name: string;
    readonly last_name: string;
    readonly birthdate: Date;
    readonly phoneNumber: string;
    readonly email: string;
    password: string;
    readonly description: string;
    readonly created_at: Date;
    readonly promoCode: [string];
}
