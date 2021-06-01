import { Place } from 'src/modules/place/interfaces/place.interface';
export declare class CreateCustomerDTO {
    readonly avatar: string;
    readonly first_name: string;
    readonly last_name: string;
    readonly birthdate: Date;
    readonly phoneNumber: string;
    readonly email: string;
    password: string;
    readonly description: string;
    readonly created_at: Date;
    readonly favorites: Place[];
    readonly customerId: string;
    readonly ownedPlaces: Place[];
}
