import { Document } from 'mongoose';
export interface ReviewPlace extends Document {
    readonly name: string;
    readonly description: string;
    readonly writerId: string;
    readonly placeId: string;
    readonly rate: number;
    readonly created_at: Date;
}
