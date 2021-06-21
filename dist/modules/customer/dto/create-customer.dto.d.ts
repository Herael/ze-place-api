import { Place } from 'src/modules/place/interfaces/place.interface';
import { Location } from 'src/modules/types';
export declare class CreateCustomerDTO {
    readonly avatar: string;
    readonly first_name: string;
    readonly last_name: string;
    readonly birthdate: Date;
    readonly phoneNumber: string;
    readonly email: string;
    password: string;
    readonly description: string;
    readonly favorites: Place[];
    readonly customerId: string;
    readonly ownedPlaces: Place[];
    readonly bookings: Place[];
    readonly pushToken: string;
    readonly gender: string;
    readonly IDRecto: string;
    readonly IDVerso: string;
    location: Location;
    readonly created_at: Date;
}
