import * as geolib from 'geolib';
import { Coords } from 'src/modules/types';

export const isPlaceInRadius = (
  origin: Coords,
  center: Coords,
  distance: number,
) => {
  return geolib.isPointWithinRadius(origin, center, distance);
};

export const isHigherPrice = (originPrice: number, placePrice: number) => {
  if (placePrice <= originPrice) {
    return true;
  }
  return false;
};

export const isInRangePrice = (
  originPrice: number,
  placePrice: number,
  percentage: number,
) => {
  if (
    placePrice <= originPrice + originPrice * percentage &&
    placePrice >= originPrice - originPrice * percentage
  ) {
    return true;
  }
  return false;
};
