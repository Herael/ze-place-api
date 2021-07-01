import { Model } from 'mongoose';
import { Place } from './interfaces/place.interface';
import { Customer } from '../customer/interfaces/customer.interface';
import { CreatePlaceDTO } from './dto/create-place.dto';
import { Coords, Location } from '../types';
import { Feature } from '../feature/interfaces/feature.interface';
export declare class PlaceService {
    private readonly placeModel;
    private readonly customerModel;
    constructor(placeModel: Model<Place>, customerModel: Model<Customer>);
    getAllPlaces(userId: string): Promise<Place[]>;
    getAllPlacesAdmin(): Promise<Place[]>;
    findById(userId: string, placeId: string): Promise<Place>;
    getPlacesNearbyCoordinates(coords: Coords, distance: number): Promise<Place[]>;
    createPlace(createPlaceDTO: CreatePlaceDTO): Promise<Place>;
    updatePlace(createPlaceDTO: CreatePlaceDTO): Promise<Place>;
    similarPlaces(placeID: string): Promise<Place[]>;
    searchPlaces(placeTypeName: string, price: number, surface: number, features: Feature[], location: Location): Promise<Place[]>;
}
