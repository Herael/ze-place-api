import * as geolib from 'geolib';
import { Coords } from 'src/modules/types';

export const isPlaceInRadius = (
  origin: Coords,
  center: Coords,
  distance: number,
) => {
  return geolib.isPointWithinRadius(origin, center, distance);
};

export const isHigherPrice = (
  originPrice: number,
  placePrice: number,
  rentingDuration: string,
) => {
  if (rentingDuration == 'week') {
    if (placePrice / 7 <= originPrice) {
      return true;
    }
  } else if (rentingDuration == 'month') {
    if (placePrice / 30 <= originPrice) {
      return true;
    }
  } else {
    if (placePrice <= originPrice) {
      return true;
    }
  }
  return false;
};

export const isInRangePrice = (
  originPrice: number,
  placePrice: number,
  rentingDuration: string,
  percentage: number,
) => {
  if (rentingDuration == 'week') {
    placePrice /= 7;
  } else if (rentingDuration == 'month') {
    placePrice /= 30;
  }

  console.log('origin Price : ' + originPrice);
  console.log('place Price : ' + placePrice);
  console.log('rentingDuration : ' + rentingDuration);
  console.log('min value : ' + (originPrice - originPrice * percentage));
  console.log('max value : ' + (originPrice + originPrice * percentage));

  if (
    placePrice <= originPrice + originPrice * percentage &&
    placePrice >= originPrice - originPrice * percentage
  ) {
    return true;
  }

  return false;
};
