import { Model } from 'mongoose';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDTO } from './dto/create-customer.dto';
export declare class CustomerService {
    private readonly customerModel;
    constructor(customerModel: Model<Customer>);
    getAllCustomer(): Promise<Customer[]>;
    findById(customerID: string): Promise<Customer>;
    findByEmail(email: string): Promise<Customer | undefined>;
    addCustomer(customer: Customer): Promise<Customer>;
    updateCustomer(customerID: string, createCustomerDTO: CreateCustomerDTO): Promise<Customer>;
    deleteCustomer(customerID: string): Promise<any>;
}
