import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Place } from './interfaces/place.interface';
import { Customer } from '../customer/interfaces/customer.interface';

import { CreatePlaceDTO } from './dto/create-place.dto';
import { BookingClient, Coords } from '../types';
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

  async bookPlace(
    userId: string,
    placeId: string,
    booking: BookingDTO['booking'],
  ) {
    const user = await this.customerModel.findById(userId);
    const b = {
      userId: user._id,
      feature: booking.features[0],
      bookingPeriod: {
        startDate: booking?.bookingPeriod.startDate,
        endDate: booking?.bookingPeriod.endDate,
        duration: booking?.bookingPeriod.duration,
      },
      description: booking.description,
    };
    const place = await this.findById(placeId);
    place.bookings.push(b as Booking);
    place.save();
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
}
