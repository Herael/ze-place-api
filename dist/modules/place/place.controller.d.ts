import { CreatePlaceDTO } from './dto/create-place.dto';
import { PlaceService } from './place.service';
export declare class PlaceController {
    private placeService;
    constructor(placeService: PlaceService);
    getAllPlaces(req: any, res: any): Promise<any>;
    getPlacesNearbyCoordinates(res: any, data: any): Promise<any>;
    createPlace(res: any, createPlaceDTO: CreatePlaceDTO): Promise<any>;
    booking(req: any, res: any, body: any): Promise<any>;
    bookings(res: any, req: any): Promise<any>;
    acceptBooking(res: any, body: any): Promise<any>;
    similarPlaces(res: any, body: any): Promise<any>;
    searchPlaces(res: any, body: any): Promise<any>;
}
