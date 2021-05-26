"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlaceInRadius = void 0;
const geolib = require("geolib");
const types_1 = require("../modules/types");
const isPlaceInRadius = (origin, center, distance) => {
    return geolib.isPointWithinRadius(origin, center, distance);
};
exports.isPlaceInRadius = isPlaceInRadius;
//# sourceMappingURL=index.js.map