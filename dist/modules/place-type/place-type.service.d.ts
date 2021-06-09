import { Model } from 'mongoose';
import { PlaceType } from './interfaces/place-type.interface';
import { CreatePlaceTypeDTO, CreatePlaceFeatureDTO } from './dto/create-place-type.dto';
export declare class PlaceTypeService {
    private readonly typeModel;
    private readonly featuresModel;
    constructor(typeModel: Model<PlaceType>, featuresModel: Model<PlaceType>);
    createType(createPlaceTypeDTO: CreatePlaceTypeDTO): Promise<PlaceType>;
    createFeatures(createPlaceFeatureDTO: CreatePlaceFeatureDTO): Promise<PlaceType>;
}
