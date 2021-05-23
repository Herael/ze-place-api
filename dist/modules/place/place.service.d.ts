import { Model } from 'mongoose';
import { Place } from './interfaces/place.interface';
import { CreatePlaceDTO } from './dto/create-place.dto';
export declare class PlaceService {
    private readonly placeModel;
    constructor(placeModel: Model<Place>);
    getAllPlaces(): Promise<Place[]>;
    createPlace(createPlaceDTO: CreatePlaceDTO): Promise<Place>;
}
