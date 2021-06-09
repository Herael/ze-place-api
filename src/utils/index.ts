import * as geolib from 'geolib';
import { Feature } from 'src/modules/feature/interfaces/feature.interface';
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

export const isContainsFeatures = (
  researchFeature: Feature[],
  placeFeature: Feature[],
) => {
  let count = 0;
  researchFeature.forEach(function (f) {
    if (placeFeature.find((e) => e.name === f.name)) {
      count++;
    }
  });
  if (count != placeFeature.length) {
    return false;
  }
  return true;
};
