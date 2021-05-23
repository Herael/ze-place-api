import { Document } from 'mongoose';
export interface PlaceType extends Document {
    readonly name: string;
    readonly created_at: Date;
}
