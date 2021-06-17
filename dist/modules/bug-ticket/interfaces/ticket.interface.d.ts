import { Document } from 'mongoose';
export interface Ticket extends Document {
    readonly name: string;
    readonly description: string;
    readonly senderId: string;
    readonly created_at: Date;
    readonly tag: string;
}
