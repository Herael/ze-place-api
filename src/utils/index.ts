import * as geolib from 'geolib';
import { Coords } from 'src/modules/types';

export const isPlaceInRadius = (
  origin: Coords,
  center: Coords,
  distance: number,
) => {
  return geolib.isPointWithinRadius(origin, center, distance);
};
