import { Document } from 'mongoose';
export interface Charges extends Document {
    readonly value: number;
    readonly created_at: Date;
    readonly name: string;
}
