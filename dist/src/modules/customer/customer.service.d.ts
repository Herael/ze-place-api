import { Model } from 'mongoose';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDTO } from './dto/create-customer.dto';
export declare class CustomerService {
    private readonly customerModel;
    constructor(customerModel: Model<Customer>);
    getAllCustomer(): Promise<Customer[]>;
    getCustomer(customerID: any): Promise<Customer>;
    addCustomer(createCustomerDTO: CreateCustomerDTO): Promise<Customer>;
    updateCustomer(customerID: any, createCustomerDTO: CreateCustomerDTO): Promise<Customer>;
    deleteCustomer(customerID: any): Promise<any>;
}
