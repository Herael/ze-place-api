import { Feature } from 'src/modules/feature/interfaces/feature.interface';
import { Coords } from 'src/modules/types';
export declare const isPlaceInRadius: (origin: Coords, center: Coords, distance: number) => boolean;
export declare const isHigherPrice: (originPrice: number, placePrice: number) => boolean;
export declare const filterOwnedPlace: (id: string, placeId: string) => boolean;
export declare const isInRangePrice: (originPrice: number, placePrice: number, percentage: number) => boolean;
export declare const isContainsFeatures: (researchFeature: Feature[], placeFeature: Feature[]) => boolean;
export declare const isTooShortToDelete: (bookingDate: string) => boolean;
export declare const sendPushNotifications: ({ pushId, title, data, description, }: {
    pushId: string;
    title: string;
    data?: any;
    description: string;
}) => Promise<any>;
export declare const getDates: (startDate: any, endDate: any) => any[];
export declare const dateToAvailabilities: (userId: string, startDate: Date, endDate: Date) => any[];
