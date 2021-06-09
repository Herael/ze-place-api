"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInRangePrice = exports.isHigherPrice = exports.isPlaceInRadius = void 0;
const geolib = require("geolib");
const types_1 = require("../modules/types");
const isPlaceInRadius = (origin, center, distance) => {
    return geolib.isPointWithinRadius(origin, center, distance);
};
exports.isPlaceInRadius = isPlaceInRadius;
const isHigherPrice = (originPrice, placePrice) => {
    if (placePrice <= originPrice) {
        return true;
    }
    return false;
};
exports.isHigherPrice = isHigherPrice;
const isInRangePrice = (originPrice, placePrice, percentage) => {
    if (placePrice <= originPrice + originPrice * percentage &&
        placePrice >= originPrice - originPrice * percentage) {
        return true;
    }
    return false;
};
exports.isInRangePrice = isInRangePrice;
//# sourceMappingURL=index.js.map