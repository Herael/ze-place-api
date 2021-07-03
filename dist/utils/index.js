"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateToAvailabilities = exports.getDates = exports.sendPushNotifications = exports.isTooShortToDelete = exports.isContainsFeatures = exports.isInRangePrice = exports.filterOwnedPlace = exports.isHigherPrice = exports.isPlaceInRadius = void 0;
const geolib = require("geolib");
const axios_1 = require("axios");
const feature_interface_1 = require("../modules/feature/interfaces/feature.interface");
const types_1 = require("../modules/types");
const booking_interface_1 = require("../modules/booking/interfaces/booking.interface");
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
const filterOwnedPlace = (id, placeId) => {
    if (id === placeId) {
        return false;
    }
    return true;
};
exports.filterOwnedPlace = filterOwnedPlace;
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
const isTooShortToDelete = (bookingDate) => {
    const today = new Date();
    const d = parseInt(String(today.getDate()).padStart(2, '0'));
    const m = parseInt(String(today.getMonth() + 1).padStart(2, '0'));
    const y = today.getFullYear();
    const startDate = bookingDate.split('-');
    if (parseInt(startDate[0]) >= y &&
        parseInt(startDate[1]) >= m &&
        parseInt(startDate[2]) >= d + 2) {
        return false;
    }
    return true;
};
exports.isTooShortToDelete = isTooShortToDelete;
const sendPushNotifications = async ({ pushId, title, data, description, }) => {
    if (pushId) {
        return await axios_1.default
            .post('https://exp.host/--/api/v2/push/send', {
            to: pushId,
            title: title,
            body: description,
            data,
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