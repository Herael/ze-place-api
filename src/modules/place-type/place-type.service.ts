import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlaceType } from './interfaces/place-type.interface';
import {
  CreatePlaceTypeDTO,
  CreatePlaceFeatureDTO,
} from './dto/create-place-type.dto';
@Injectable()
export class PlaceTypeService {
  constructor(
    @InjectModel('Type') private readonly typeModel: Model<PlaceType>,
    @InjectModel('Features') private readonly featuresModel: Model<PlaceType>,
  ) {}

  async createType(createPlaceTypeDTO: CreatePlaceTypeDTO) {
    const newPlace = await new this.typeModel(createPlaceTypeDTO).save();

    return newPlace;
  }
  async createFeatures(createPlaceFeatureDTO: CreatePlaceFeatureDTO) {
    const newPlace = await new this.featuresModel(createPlaceFeatureDTO).save();

    return newPlace;
  }

  async getType() {
    const newType = await this.typeModel.find();
    return newType;
  }
  async getFeatures() {

    const newType = await this.featuresModel.find();
    return newType;
  }
}
