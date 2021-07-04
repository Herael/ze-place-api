import { Model } from 'mongoose';
import { Place } from './interfaces/place.interface';
import { Customer } from '../customer/interfaces/customer.interface';
import { CreatePlaceDTO } from './dto/create-place.dto';
import { Coords, Location } from '../types';
import { Feature } from '../feature/interfaces/feature.interface';
import { PlaceType } from '../place-type/interfaces/place-type.interface';
import { Booking } from '../booking/interfaces/booking.interface';
export declare class PlaceService {
    private readonly placeModel;
    private readonly bookingModel;
    private readonly customerModel;
    constructor(placeModel: Model<Place>, bookingModel: Model<Booking>, customerModel: Model<Customer>);
    getAllPlaces(userId: string, limit?: number): Promise<Place[]>;
    getAllPlacesShuffle(userId: string, limit?: number): Promise<Place[]>;
    getAllPlacesAdmin(): Promise<Place[]>;
    findById(userId: string, placeId: string): Promise<Place>;
    getPlacesNearbyCoordinates(coords: Coords, distance: number, limit?: number): Promise<Place[]>;
    createPlace(createPlaceDTO: CreatePlaceDTO): Promise<Place>;
    updatePlace(createPlaceDTO: CreatePlaceDTO): Promise<Place>;
    similarPlaces(placeID: string, limit?: number): Promise<Place[]>;
    searchPlaces(placeType: PlaceType, price: number, surface: number, features: Feature[], location: Location): Promise<Place[]>;
    deletePlace(placeId: string): Promise<any>;
}
