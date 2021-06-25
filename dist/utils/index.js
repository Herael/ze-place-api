"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateToAvailabilities = exports.getDates = exports.sendPushNotifications = exports.isContainsFeatures = exports.isInRangePrice = exports.isHigherPrice = exports.isPlaceInRadius = void 0;
const geolib = require("geolib");
const axios_1 = require("axios");
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
const sendPushNotifications = async ({ pushId, title, description }) => {
    if (pushId) {
        return await axios_1.default
            .post('https://exp.host/--/api/v2/push/send', {
            to: pushId,
            title: title,
            body: description,
        })
            .then((response) => {
            return response.data;
        })
            .catch((err) => {
            return Promise.reject(err);
        });
    }
};
exports.sendPushNotifications = sendPushNotifications;
const getDates = (startDate, endDate) => {
    let dates = [], currentDate = startDate, addDays = function (days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };
    while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
    }
    return dates;
};
exports.getDates = getDates;
const dateToAvailabilities = (userId, startDate, endDate) => {
    const dates = [];
    let currentDate = startDate, addDays = function (days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };
    while (currentDate <= endDate) {
        const month = `${currentDate.getMonth() < 10 ? '0' : ''}${currentDate.getMonth() + 1}`;
        const day = `${currentDate.getDate() < 10 ? '0' : ''}${currentDate.getDate()}`;
        const formatDate = `${currentDate.getFullYear()}-${month}-${day}`;
        dates.push({
            userId,
            date: formatDate,
            disabled: true,
        });
        currentDate = addDays.call(currentDate, 1);
    }
    return dates;
};
exports.dateToAvailabilities = dateToAvailabilities;
//# sourceMappingURL=index.js.map