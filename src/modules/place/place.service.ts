import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Place } from './interfaces/place.interface';
import { Customer } from '../customer/interfaces/customer.interface';

import { CreatePlaceDTO } from './dto/create-place.dto';
import { Coords, Location } from '../types';
import {
  filterOwnedPlace,
  isContainsFeatures,
  isHigherPrice,
  isInRangePrice,
  isPlaceInRadius,
  isTooShortToDelete,
} from '../../utils/index';
import { Feature } from '../feature/interfaces/feature.interface';
import { PlaceType } from '../place-type/interfaces/place-type.interface';
import { Booking } from '../booking/interfaces/booking.interface';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel('Place') private readonly placeModel: Model<Place>,
    @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
  ) {}

  async getAllPlaces(userId: string, limit?: number) {
    const user = await this.customerModel.findById(userId);
    const places = await this.placeModel
      .find()
      .sort({ created_at: -1 })
      .limit(limit)
      .exec();
    const formattedPlaces = places.map((place) => {
      place.isFavorite = Boolean(
        user.favorites.find((p) => p._id.toString() === place._id.toString()),
      );
      return place;
    });
    return formattedPlaces;
  }

  async getAllPlacesShuffle(userId: string, limit?: number) {
    const user = await this.customerModel.findById(userId);
    const places = await this.placeModel.find().limit(limit).exec();
    const formattedPlaces = places.map((place) => {
      place.isFavorite = Boolean(
        user.favorites.find((p) => p._id.toString() === place._id.toString()),
      );
      return place;
    });
    return formattedPlaces.sort(() => 0.5 - Math.random());
  }

  async getAllPlacesAdmin() {
    const places = await this.placeModel.find().exec();

    return places;
  }

  async getPlacesByUser(userId: string) {
    const places = await this.placeModel.find({ ownerId: userId }).exec();
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
    limit?: number,
  ): Promise<Place[]> {
    let places = await this.placeModel.find().sort({ created_at: -1 }).exec();
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
    places.slice(0, 10);
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

  async updatePlace(createPlaceDTO: CreatePlaceDTO): Promise<Place> {
    const place = await this.placeModel.findOneAndUpdate(
      {
        _id: createPlaceDTO.placeId,
      },
      {
        title: createPlaceDTO.title,
        location: createPlaceDTO.location,
        surface: createPlaceDTO.surface,
        placeType: createPlaceDTO.placeType,
        price: createPlaceDTO.price,
        description: createPlaceDTO.description,
        features: createPlaceDTO.features,
        images: createPlaceDTO.images,
        authorizeAnimals: createPlaceDTO.authorizeAnimals,
        authorizeMusic: createPlaceDTO.authorizeMusic,
        authorizeSmoking: createPlaceDTO.authorizeSmoking,
        authorizeFire: createPlaceDTO.authorizeFire,
        authorizeFoodAndDrink: createPlaceDTO.authorizeFoodAndDrink,
      },
    );
    place.save();
    return place;
  }

  async similarPlaces(placeID: string, limit?: number): Promise<Place[]> {
    const place = await this.placeModel.findById(placeID);
    // const priceDif = 0.4;
    // const price = place.price;
    const distance = 40000;
    const coords = {
      latitude: place.location.latitude,
      longitude: place.location.longitude,
    };

    let places = await this.placeModel
      .find({ _id: { $ne: place._id }, placeType: place.placeType })
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

    // places = places.filter(
    //   (placeElement: Place) =>
    //     isInRangePrice(price, placeElement.price, priceDif) === true,
    // );

    return places;
  }

  async searchPlaces(
    placeType: PlaceType,
    price: number,
    surface: number,
    features: Feature[],
    location: Location,
  ): Promise<Place[]> {
    const distance = 20000;
    let places = [];

    if (placeType && surface) {
      places = await this.placeModel
        .find({
          placeType: placeType,
          surface: { $gte: surface },
        })
        .exec();
    } else if (placeType) {
      places = await this.placeModel
        .find({
          placeType: placeType,
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

  async deletePlace(placeId: string): Promise<any> {
    const place = await this.placeModel.findById(placeId);
    const bookings = await this.bookingModel.find({ placeId: placeId });
    const checkBooking = bookings.filter(
      (booking: Booking) => isTooShortToDelete(booking.startDate) === true,
    );
    if (checkBooking.length > 0) {
      return false;
    }
    bookings.forEach(async (e) => {
      await this.bookingModel.findByIdAndRemove(e._id);
    });
    await this.placeModel.findByIdAndRemove(placeId).exec();
    const user = await this.customerModel.findById(place.ownerId);
    user.ownedPlaces.filter(
      (place: Place) => filterOwnedPlace(place._id, placeId) === true,
    );
    await user.save();
    return true;
  }
}
