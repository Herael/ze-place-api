import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Place } from './interfaces/place.interface';
import { Customer } from '../customer/interfaces/customer.interface';

import { CreatePlaceDTO } from './dto/create-place.dto';
import { Coords, Location } from '../types';
import {
  isContainsFeatures,
  isHigherPrice,
  isInRangePrice,
  isPlaceInRadius,
} from '../../utils/index';
import { Booking } from '../booking/interfaces/booking.interface';
import { BookingDTO } from '../booking/dto/booking.dto';
import { Feature } from '../feature/interfaces/feature.interface';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel('Place') private readonly placeModel: Model<Place>,
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
  ) {}

  async getAllPlaces(userId: string) {
    const user = await this.customerModel.findById(userId);
    const places = await this.placeModel.find().exec();
    const formattedPlaces = places.map((place) => {
      place.isFavorite = Boolean(
        user.favorites.find((p) => p._id.toString() === place._id.toString()),
      );
      return place;
    });
    return formattedPlaces;
  }

  async getAllPlacesAdmin() {
    const places = await this.placeModel.find().exec();

    return places;
  }

  async findById(userId: string, placeId: string): Promise<Place> {
    const user = await this.customerModel.findById(userId);
    const place = await this.placeModel.findById(placeId).exec();
    place.isFavorite = Boolean(
      user.favorites.find((p) => p._id.toString() === place._id.toString()),
    );
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
    const priceDif = 0.4;
    const price = place.price;
    const distance = 20000;
    const coords = {
      latitude: place.location.latitude,
      longitude: place.location.longitude,
    };

    let places = await this.placeModel
      .find({
        _id: { $ne: place._id },
        placeType: { $elemMatch: { name: place.placeType[0].name } }, //PlaceType.name fit with my origin place
      })
      .exec();

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

    places = places.filter(
      (placeElement: Place) =>
        isInRangePrice(price, placeElement.price, priceDif) === true,
    );

    return places;
  }

  async searchPlaces(
    placeTypeName: string,
    price: number,
    surface: number,
    features: Feature[],
    location: Location,
  ): Promise<Place[]> {
    const distance = 20000;
    let places = [];

    if (placeTypeName && surface) {
      places = await this.placeModel
        .find({
          placeType: { $elemMatch: { name: placeTypeName } },
          surface: { $gte: surface },
        })
        .exec();
    } else if (placeTypeName) {
      places = await this.placeModel
        .find({
          placeType: { $elemMatch: { name: placeTypeName } },
        })
        .exec();
    } else if (surface) {
      places = await this.placeModel
        .find({
          surface: { $gte: surface },
        })
        .exec();
    } else {
      places = await this.placeModel.find();
    }

    if (location) {
      const coords = {
        latitude: location.latitude,
        longitude: location.longitude,
      };
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
    }
    if (price) {
      places = places.filter(
        (place: Place) => isHigherPrice(price, place.price) === true,
      );
    }
    if (features && features.length > 0) {
      places = places.filter(
        (place: Place) => isContainsFeatures(features, place.features) === true,
      );
    }

    return places;
  }
}
