import { Document } from 'mongoose';
import { Feature } from 'src/modules/feature/interfaces/feature.interface';

export interface Charges extends Document {
    readonly value:number;
    readonly created_at: Date;
    readonly name:string
}
