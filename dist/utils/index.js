"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isContainsFeatures = exports.isInRangePrice = exports.isHigherPrice = exports.isPlaceInRadius = void 0;
const geolib = require("geolib");
const feature_interface_1 = require("../modules/feature/interfaces/feature.interface");
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
const isContainsFeatures = (researchFeature, placeFeature) => {
    let count = 0;
    researchFeature.forEach(function (f) {
        if (placeFeature.find((e) => e.name === f.name)) {
            count++;
        }
    });
    if (count != researchFeature.length) {
        return false;
    }
    return true;
};
exports.isContainsFeatures = isContainsFeatures;
//# sourceMappingURL=index.js.map