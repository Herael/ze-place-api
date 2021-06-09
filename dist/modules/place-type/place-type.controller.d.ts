import { PlaceTypeService } from './place-type.service';
export declare class PlaceTypeController {
    private typeService;
    constructor(typeService: PlaceTypeService);
    createType(res: any, data: any): Promise<any>;
    createFeatures(res: any, data: any): Promise<any>;
}
