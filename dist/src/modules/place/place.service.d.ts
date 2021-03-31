import { Model } from 'mongoose';
import { Place } from './interfaces/place.interface';
export declare class PlaceService {
    private readonly placeModel;
    constructor(placeModel: Model<Place>);
    getAllCustomer(): Promise<Place[]>;
}
