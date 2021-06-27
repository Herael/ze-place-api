import { Document } from 'mongoose';
export interface Feature extends Document {
    readonly name: string;
    readonly image: string;
    readonly created_at: Date;
}
