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
import { Feature } from '../feature/interfaces/feature.interface';
import { PlaceType } from '../place-type/interfaces/place-type.interface';

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

  async getAllPlacesShuffle(userId: string) {
    const user = await this.customerModel.findById(userId);
    const places = await this.placeModel.find().exec();
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
        placeType: place.placeType,
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
}
