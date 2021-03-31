import { PlaceService } from './place.service';
export declare class PlaceController {
    private placeService;
    constructor(placeService: PlaceService);
    getAllCustomer(res: any): Promise<any>;
}
