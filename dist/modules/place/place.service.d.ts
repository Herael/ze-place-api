import { Model } from 'mongoose';
import { Place } from './interfaces/place.interface';
import { Customer } from '../customer/interfaces/customer.interface';
import { CreatePlaceDTO } from './dto/create-place.dto';
import { Coords } from '../types';
export declare class PlaceService {
    private readonly placeModel;
    private readonly customerModel;
    constructor(placeModel: Model<Place>, customerModel: Model<Customer>);
    getAllPlaces(): Promise<Place[]>;
    getPlacesNearbyCoordinates(coords: Coords, distance: number): Promise<Place[]>;
    createPlace(createPlaceDTO: CreatePlaceDTO): Promise<Place>;
}
