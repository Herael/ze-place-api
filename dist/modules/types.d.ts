import { Feature } from './feature/interfaces/feature.interface';
export declare type Image = {
    name: string;
    url: string;
};
export declare type Location = {
    address?: string;
    postalCode?: string;
    city?: string;
    country?: string;
    longitude?: number;
    latitude?: number;
};
export declare type Coords = {
    longitude: number;
    latitude: number;
};
export declare type BookingClient = {
    features: Feature;
    bookingPeriod: {
        startDate?: string;
        endDate?: string;
        duration?: number;
    };
    description: string;
};
