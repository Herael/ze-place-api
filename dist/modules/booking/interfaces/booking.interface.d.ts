import { Document } from 'mongoose';
import { Feature } from 'src/modules/feature/interfaces/feature.interface';
export interface Booking extends Document {
    readonly placeId: string;
    readonly ownerId: string;
    readonly userId: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly avatar: string;
    readonly feature: Feature;
    readonly startDate: string;
    readonly endDate: string;
    readonly duration: number;
    readonly description: string;
    readonly price: number;
    isAccepted: boolean;
    isDenied: boolean;
    isPast: boolean;
}
