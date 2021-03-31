import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Place } from './interfaces/place.interface';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel('Place') private readonly placeModel: Model<Place>,
  ) {}
  // fetch all customers
  async getAllCustomer(): Promise<Place[]> {
    const places = await this.placeModel.find().exec();
    return places;
  }
}
