import { Model } from 'mongoose';
import { Place } from './interfaces/place.interface';
import { Customer } from '../customer/interfaces/customer.interface';
import { CreatePlaceDTO } from './dto/create-place.dto';
import { Coords, Location } from '../types';
import { Booking } from '../booking/interfaces/booking.interface';
import { BookingDTO } from '../booking/dto/booking.dto';
import { Feature } from '../feature/interfaces/feature.interface';
export declare class PlaceService {
    private readonly placeModel;
    private readonly customerModel;
    constructor(placeModel: Model<Place>, customerModel: Model<Customer>);
    getAllPlaces(userId: string): Promise<Place[]>;
    findById(placeId: string): Promise<Place>;
    getPlacesNearbyCoordinates(coords: Coords, distance: number): Promise<Place[]>;
    bookPlace(userId: string, placeId: string, bookingDTO: BookingDTO): Promise<void>;
    getBookings(placeId: string): Promise<Booking[]>;
    acceptBooking(placeId: string, bookingId: any): Promise<Booking[]>;
    createPlace(createPlaceDTO: CreatePlaceDTO): Promise<Place>;
    similarPlaces(placeID: string): Promise<Place[]>;
    searchPlaces(placeTypeName: string, price: number, surface: number, features: Feature[], location: Location): Promise<Place[]>;
}
