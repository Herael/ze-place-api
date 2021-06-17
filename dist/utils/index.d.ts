import { Feature } from 'src/modules/feature/interfaces/feature.interface';
import { Coords } from 'src/modules/types';
export declare const isPlaceInRadius: (origin: Coords, center: Coords, distance: number) => boolean;
export declare const isHigherPrice: (originPrice: number, placePrice: number) => boolean;
export declare const isInRangePrice: (originPrice: number, placePrice: number, percentage: number) => boolean;
export declare const isContainsFeatures: (researchFeature: Feature[], placeFeature: Feature[]) => boolean;
export declare const sendPushNotifications: ({ pushId, title, description }: {
    pushId: any;
    title: any;
    description: any;
}) => Promise<any>;
