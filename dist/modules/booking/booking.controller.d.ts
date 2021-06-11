import { BookingService } from './booking.service';
export declare class BookingController {
    private bookingService;
    constructor(bookingService: BookingService);
    booking(req: any, res: any, body: any): Promise<any>;
    getBookingsByPlaceAndUser(req: any, res: any): Promise<any>;
    getBookingsByUser(req: any, res: any): Promise<any>;
    getBookingsByOwner(req: any, res: any): Promise<any>;
    getBookingsByPlace(req: any, res: any): Promise<any>;
    acceptBooking(req: any, res: any): Promise<any>;
    denyBooking(req: any, res: any): Promise<any>;
}
