import { Model } from 'mongoose';
import { Place } from './interfaces/place.interface';
import { Customer } from '../customer/interfaces/customer.interface';
import { CreatePlaceDTO } from './dto/create-place.dto';
import { Coords } from '../types';
import { BookingDTO } from '../booking/dto/booking.dto';
export declare class PlaceService {
    private readonly placeModel;
    private readonly customerModel;
    constructor(placeModel: Model<Place>, customerModel: Model<Customer>);
    getAllPlaces(): Promise<Place[]>;
    findById(placeId: string): Promise<Place>;
    getPlacesNearbyCoordinates(coords: Coords, distance: number): Promise<Place[]>;
    bookPlace(userId: string, placeId: string, booking: BookingDTO['booking']): Promise<void>;
    createPlace(createPlaceDTO: CreatePlaceDTO): Promise<Place>;
}
