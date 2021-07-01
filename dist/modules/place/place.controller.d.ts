import { CreatePlaceDTO } from './dto/create-place.dto';
import { PlaceService } from './place.service';
export declare class PlaceController {
    private placeService;
    constructor(placeService: PlaceService);
    getAllPlaces(req: any, res: any): Promise<any>;
    getAllPlacesAdmin(req: any, res: any): Promise<any>;
    getPlaceById(req: any, res: any): Promise<any>;
    getPlacesNearbyCoordinates(res: any, data: any): Promise<any>;
    createPlace(res: any, createPlaceDTO: CreatePlaceDTO): Promise<any>;
    updatePlace(res: any, createPlaceDTO: CreatePlaceDTO): Promise<any>;
    similarPlaces(res: any, body: any): Promise<any>;
    searchPlaces(res: any, body: any): Promise<any>;
}
