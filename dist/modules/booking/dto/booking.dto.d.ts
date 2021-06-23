import { Feature } from 'src/modules/feature/interfaces/feature.interface';
export declare class BookingDTO {
    readonly paymentId: string;
    readonly ownerId: string;
    readonly placeId: string;
    readonly feature: Feature;
    readonly startDate: string;
    readonly endDate: string;
    readonly duration: number;
    readonly price: number;
    readonly description: string;
}
