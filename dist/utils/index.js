"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInRangePrice = exports.isHigherPrice = exports.isPlaceInRadius = void 0;
const geolib = require("geolib");
const types_1 = require("../modules/types");
const isPlaceInRadius = (origin, center, distance) => {
    return geolib.isPointWithinRadius(origin, center, distance);
};
exports.isPlaceInRadius = isPlaceInRadius;
const isHigherPrice = (originPrice, placePrice, rentingDuration) => {
    if (rentingDuration == 'week') {
        if (placePrice / 7 <= originPrice) {
            return true;
        }
    }
    else if (rentingDuration == 'month') {
        if (placePrice / 30 <= originPrice) {
            return true;
        }
    }
    else {
        if (placePrice <= originPrice) {
            return true;
        }
    }
    return false;
};
exports.isHigherPrice = isHigherPrice;
const isInRangePrice = (originPrice, placePrice, rentingDuration, percentage) => {
    if (rentingDuration == 'week') {
        placePrice /= 7;
    }
    else if (rentingDuration == 'month') {
        placePrice /= 30;
    }
    console.log('origin Price : ' + originPrice);
    console.log('place Price : ' + placePrice);
    console.log('rentingDuration : ' + rentingDuration);
    console.log('min value : ' + (originPrice - originPrice * percentage));
    console.log('max value : ' + (originPrice + originPrice * percentage));
    if (placePrice <= originPrice + originPrice * percentage &&
        placePrice >= originPrice - originPrice * percentage) {
        return true;
    }
    return false;
};
exports.isInRangePrice = isInRangePrice;
//# sourceMappingURL=index.js.map