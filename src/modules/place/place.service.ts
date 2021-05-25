import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Place } from './interfaces/place.interface';
import { CreatePlaceDTO } from './dto/create-place.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel('Place') private readonly placeModel: Model<Place>,
  ) {}

  async getAllPlaces(): Promise<Place[]> {
    const places = await this.placeModel.find().exec();
    return places;
  }

  async createPlace(createPlaceDTO: CreatePlaceDTO): Promise<Place> {
    const newPlace = await new this.placeModel(createPlaceDTO).save();
    return newPlace;
  }
}
