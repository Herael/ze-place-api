import { Document } from 'mongoose';
export interface PlaceType extends Document {
    readonly name: string;
    readonly created_at: Date;
}
export interface PlaceFeatures extends Document {
    readonly name: string;
    readonly image: string;
    readonly created_at: Date;
}
