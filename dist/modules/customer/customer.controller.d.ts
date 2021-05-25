import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { Place } from '../place/interfaces/place.interface';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    getAllCustomer(res: any): Promise<any>;
    getCustomer(res: any, customerID: any): Promise<any>;
    updateCustomer(res: any, customerID: any, createCustomerDTO: CreateCustomerDTO): Promise<any>;
    addFavorite(res: any, customerID: any, place: Place): Promise<any>;
    deleteFavorite(res: any, customerID: any, place: Place): Promise<any>;
    deleteCustomer(res: any, customerID: any): Promise<any>;
    addPromoCode(res: any, req: any, customerID: any): Promise<any>;
}
