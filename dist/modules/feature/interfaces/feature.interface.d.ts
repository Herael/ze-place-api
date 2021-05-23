import { Document } from 'mongoose';
export interface Feature extends Document {
    readonly name: string;
    readonly created_at: Date;
}
