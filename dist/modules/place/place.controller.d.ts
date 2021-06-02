import { BookingDTO } from '../booking/dto/booking.dto';
import { CreatePlaceDTO } from './dto/create-place.dto';
import { PlaceService } from './place.service';
export declare class PlaceController {
    private placeService;
    constructor(placeService: PlaceService);
    getAllPlaces(res: any): Promise<any>;
    getPlacesNearbyCoordinates(res: any, data: any): Promise<any>;
    createPlace(res: any, createPlaceDTO: CreatePlaceDTO): Promise<any>;
    booking(req: any, res: any, bookingDTO: BookingDTO): Promise<any>;
}
