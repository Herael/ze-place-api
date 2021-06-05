import { CreatePlaceDTO } from './dto/create-place.dto';
import { Place } from './interfaces/place.interface';
import { PlaceService } from './place.service';
export declare class PlaceController {
    private placeService;
    constructor(placeService: PlaceService);
    getAllPlaces(res: any): Promise<any>;
    getPlacesNearbyCoordinates(res: any, data: any): Promise<any>;
    createPlace(res: any, createPlaceDTO: CreatePlaceDTO): Promise<any>;
    similarPlaces(res: any, place: Place): Promise<any>;
}
