import { Model } from 'mongoose';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { Promo } from '../promo/interfaces/promo.interface';
import { Place } from '../place/interfaces/place.interface';
export declare class CustomerService {
    private readonly customerModel;
    private readonly promoModel;
    constructor(customerModel: Model<Customer>, promoModel: Model<Promo>);
    getAllCustomer(): Promise<Customer[]>;
    findById(customerID: string): Promise<Customer>;
    findByEmail(email: string): Promise<Customer | undefined>;
    addCustomer(customer: Customer): Promise<Customer>;
    updateCustomer(customerID: string, createCustomerDTO: CreateCustomerDTO): Promise<Customer>;
    deleteCustomer(customerID: string): Promise<any>;
    addPromoCode(promoCodeName: Promo, customerID: string): Promise<any>;
    addFavorite(customerID: string, place: Place): Promise<void>;
    deleteFavorite(customerID: string, placeId: string): Promise<void>;
}
