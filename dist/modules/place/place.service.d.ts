import { Model } from 'mongoose';
import { Place } from './interfaces/place.interface';
import { CreatePlaceDTO } from './dto/create-place.dto';
import { Coords } from '../types';
export declare class PlaceService {
    private readonly placeModel;
    constructor(placeModel: Model<Place>);
    getAllPlaces(): Promise<Place[]>;
    getPlacesNearbyCoordinates(coords: Coords, distance: number): Promise<Place[]>;
    createPlace(createPlaceDTO: CreatePlaceDTO): Promise<Place>;
}
