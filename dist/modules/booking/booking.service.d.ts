import { Model } from 'mongoose';
import { Customer } from '../customer/interfaces/customer.interface';
import { Place } from '../place/interfaces/place.interface';
import { BookingDTO } from './dto/booking.dto';
import { Booking } from './interfaces/booking.interface';
export declare class BookingService {
    private readonly bookingModel;
    private readonly customerModel;
    private readonly placeModel;
    constructor(bookingModel: Model<Booking>, customerModel: Model<Customer>, placeModel: Model<Place>);
    bookPlace(userId: string, bookingDTO: BookingDTO): Promise<void>;
    getBookingsOfTheDay(userId: string, placeId: string): Promise<Booking[]>;
    getBookingsByPlaceAndUser(userId: string, placeId: string): Promise<Booking[]>;
    getBookingsByUser(userId: string): Promise<Booking[]>;
    getBookingsByOwner(userId: string): Promise<Booking[]>;
    getBookingsByPlace(placeId: string): Promise<Booking[]>;
    getBookings(): Promise<Booking[]>;
    acceptBooking(bookingId: string): Promise<Booking>;
    denyBooking(userId: string, bookingId: string): Promise<Booking>;
}
