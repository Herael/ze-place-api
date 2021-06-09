import { Coords } from 'src/modules/types';
export declare const isPlaceInRadius: (origin: Coords, center: Coords, distance: number) => boolean;
export declare const isHigherPrice: (originPrice: number, placePrice: number) => boolean;
export declare const isInRangePrice: (originPrice: number, placePrice: number, percentage: number) => boolean;
