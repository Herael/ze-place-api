import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Place } from './interfaces/place.interface';
import { Customer } from '../customer/interfaces/customer.interface';

import { CreatePlaceDTO } from './dto/create-place.dto';
import { Coords } from '../types';
import { isPlaceInRadius } from '../../utils/index';

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

  async  getPlacesNearbyCoordinates(
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

  async similarPlaces(place: Place): Promise<Place[]> {
    console.log(place._id);
    const priceDif = 0.1;
    let priceType = 1;
    const distance = 5000;
    if (place.rentingDuration == 'week') {
      priceType = 7;
    } else if (place.rentingDuration == 'month') {
      priceType = 30;
    }

    console.log('Original price : ' + place.price);
    console.log('Place type : ' + place.rentingDuration);
    console.log('divider value : ' + priceType);

    console.log('price : ' + place.price / priceType);

    console.log(
      '10% more : ' +
        (
          place.price / priceType +
          (place.price / priceType) * priceDif
        ).toString(),
    );
    console.log(
      '10% less : ' +
        (
          place.price / priceType -
          (place.price / priceType) * priceDif
        ).toString(),
    );
    const coords = {
      latitude: place.location.latitude,
      longitude: place.location.longitude,
    };
    const places = await this.placeModel
      .find({
        _id: { $ne: place._id },
        placeType: { $elemMatch: { name: place.placeType[0].name } }, //PlaceType.name fit with my origin place
        $or: [
          {
            price: {
              //  10 % greather than the price
              $lte:
                place.price / priceType + (place.price / priceType) * priceDif,
            },
          },
          {
            price: {
              // 10 % lower than the price
              $gte:
                place.price / priceType - (place.price / priceType) * priceDif,
            },
          },
        ],
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

    /* Ranking : 
      1- placeType
      2 - Price
      3- location (calculer la distance longitude latitude)
      4- features (Lunch / Party / Camping / ...)
      5- authorizeBoolean (Animals, Music, Smoking, Fire, FoodAndDrink)
    */

    return nearbyPlaces;
  }
}
