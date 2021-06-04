import { Model } from 'mongoose';
import { Place } from './interfaces/place.interface';
import { Customer } from '../customer/interfaces/customer.interface';
import { CreatePlaceDTO } from './dto/create-place.dto';
import { Coords } from '../types';
import { Booking } from '../booking/interfaces/booking.interface';
import { BookingDTO } from '../booking/dto/booking.dto';
export declare class PlaceService {
    private readonly placeModel;
    private readonly customerModel;
    constructor(placeModel: Model<Place>, customerModel: Model<Customer>);
    getAllPlaces(): Promise<Place[]>;
    findById(placeId: string): Promise<Place>;
    getPlacesNearbyCoordinates(coords: Coords, distance: number): Promise<Place[]>;
    bookPlace(userId: string, placeId: string, bookingDTO: BookingDTO): Promise<void>;
    getBookings(placeId: string): Promise<Booking[]>;
    acceptBooking(placeId: string, bookingId: any): Promise<Booking[]>;
    createPlace(createPlaceDTO: CreatePlaceDTO): Promise<Place>;
}
