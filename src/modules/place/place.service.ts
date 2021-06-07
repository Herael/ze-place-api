import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Place } from './interfaces/place.interface';
import { Customer } from '../customer/interfaces/customer.interface';

import { CreatePlaceDTO } from './dto/create-place.dto';
import { Coords } from '../types';
import { isPlaceInRadius } from '../../utils/index';
import { Booking } from '../booking/interfaces/booking.interface';
import { BookingDTO } from '../booking/dto/booking.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel('Place') private readonly placeModel: Model<Place>,
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
  ) {}

  async getAllPlaces(): Promise<Place[]> {
    const places = await this.placeModel.find().exec();
    return places;
  }

  async findById(placeId: string): Promise<Place> {
    const place = await this.placeModel.findById(placeId).exec();
    return place;
  }

  async getPlacesNearbyCoordinates(
    coords: Coords,
    distance: number,
  ): Promise<Place[]> {
    let places = await this.placeModel.find().exec();
    places = places.filter(
      (place: Place) =>
        isPlaceInRadius(
          {
            longitude: place.location.longitude,
            latitude: place.location.latitude,
          },
          coords,
          distance,
        ) === true,
    );
    return places;
  }

  async bookPlace(userId: string, placeId: string, bookingDTO: BookingDTO) {
    const user = await this.customerModel.findById(userId);
    const place = await this.findById(placeId);
    const booking = {
      userId: user._id,
      firstname: user.first_name,
      lastname: user.last_name,
      avatar: user.avatar,
      ...bookingDTO,
    };
    const index = place.bookings.push(booking as Booking);
    user.bookings.push(place.bookings[index]._id);
    user.save();
    place.save();
  }

  async getBookings(placeId: string): Promise<Booking[]> {
    const place = await this.findById(placeId);
    return place.bookings;
  }

  async acceptBooking(placeId: string, bookingId): Promise<Booking[]> {
    const place = await this.findById(placeId);
    const booking = place.bookings.find(
      (booking) => booking._id.toString() === bookingId.toString(),
    );
    booking.isAccepted = true;
    place.save();
    return place.bookings;
  }

  async createPlace(createPlaceDTO: CreatePlaceDTO): Promise<Place> {
    const newPlace = await new this.placeModel(createPlaceDTO).save();
    const updatedCustomer = await this.customerModel.findById(
      createPlaceDTO.ownerId,
    );
    updatedCustomer.ownedPlaces.push(newPlace);
    updatedCustomer.save();

    return newPlace;
  }

  async similarPlaces(placeID: string): Promise<Place[]> {
    const place = await this.placeModel.findById(placeID);
    const priceDif = 0.2;
    let priceType = 1;
    const distance = 20000;
    const finalPlaces = [];
    if (place.rentingDuration == 'week') {
      priceType = 7;
    } else if (place.rentingDuration == 'month') {
      priceType = 30;
    }
    const minDayPrice =
      place.price / priceType - (place.price / priceType) * priceDif;
    const maxDayPrice =
      place.price / priceType + (place.price / priceType) * priceDif;

    const coords = {
      latitude: place.location.latitude,
      longitude: place.location.longitude,
    };
    const places = await this.placeModel
      .find({
        _id: { $ne: place._id },
        placeType: { $elemMatch: { name: place.placeType[0].name } }, //PlaceType.name fit with my origin place
      })
      .exec();

    const nearbyPlaces = places.filter(
      (place: Place) =>
        isPlaceInRadius(
          {
            longitude: place.location.longitude,
            latitude: place.location.latitude,
          },
          coords,
          distance,
        ) === true,
    );

    nearbyPlaces.forEach(function (place) {
      console.log(place._id);
      let placeType = 1;
      if (place.rentingDuration == 'week') {
        placeType = 7;
      } else if (place.rentingDuration == 'month') {
        placeType = 30;
      }
      const price = place.price / placeType;
      if (price <= maxDayPrice && price >= minDayPrice) {
        finalPlaces.push(place);
      }
    });

    /* Ranking : 
      1- placeType
      2- location (calculer la distance longitude latitude)
      3- Price
      4- features (Lunch / Party / Camping / ...)
      5- authorizeBoolean (Animals, Music, Smoking, Fire, FoodAndDrink)
    */

    return finalPlaces;
  }
}
