import * as geolib from 'geolib';
import axios, { AxiosResponse } from 'axios';
import { Feature } from 'src/modules/feature/interfaces/feature.interface';
import { Coords } from 'src/modules/types';
import Moment from 'moment';
import MomentRange from 'moment-range';
import { Booking } from 'src/modules/booking/interfaces/booking.interface';

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

export const filterOwnedPlace = (id: string, placeId: string) => {
  if (id === placeId) {
    return false;
  }
  return true;
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
  if (count != researchFeature.length) {
    return false;
  }
  return true;
};

export const isTooShortToDelete = (bookingDate: string) => {
  const today = new Date();
  const d = parseInt(String(today.getDate()).padStart(2, '0'));
  const m = parseInt(String(today.getMonth() + 1).padStart(2, '0'));
  const y = today.getFullYear();
  const startDate = bookingDate.split('-');
  if (
    parseInt(startDate[0]) >= y &&
    parseInt(startDate[1]) >= m &&
    parseInt(startDate[2]) >= d + 2
  ) {
    return false;
  }
  return true;
};

export const sendPushNotifications = async ({
  pushId,
  title,
  subtitle,
  data,
  description,
}: {
  pushId: string;
  title: string;
  subtitle?: string;
  data?: any;
  description: string;
}) => {
  if (pushId) {
    return await axios
      .post('https://exp.host/--/api/v2/push/send', {
        to: pushId,
        title: title,
        subtitle: subtitle,
        body: description,
        data,
      })
      .then((response: AxiosResponse<any>) => {
        return response.data;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
};

export const getDates = (startDate, endDate) => {
  let dates = [],
    currentDate = startDate,
    addDays = function (days) {
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

export const dateToAvailabilities = (
  userId: string,
  startDate: Date,
  endDate: Date,
) => {
  const dates = [];
  let currentDate: Date = startDate,
    addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
  while (currentDate <= endDate) {
    const month = `${currentDate.getMonth() < 10 ? '0' : ''}${
      currentDate.getMonth() + 1
    }`;
    const day = `${
      currentDate.getDate() < 10 ? '0' : ''
    }${currentDate.getDate()}`;
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
