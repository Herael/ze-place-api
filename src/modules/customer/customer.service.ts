import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { hash } from 'bcrypt';
import { Place } from '../place/interfaces/place.interface';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
  ) {}

  async getAllCustomer(): Promise<Customer[]> {
    const customers = await this.customerModel.find().exec();
    return customers;
  }

  async findById(customerID: string): Promise<Customer> {
    const customer = await this.customerModel.findById(customerID).populate({
      path: 'favorites',
      model: 'Place',
      // select: '_id title price',
    });
    console.log('favorite : ' + customer.favorites);

    return customer;
  }

  async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.customerModel.findOne({ email: email }).exec();
    return customer;
  }

  async addCustomer(customer: Customer): Promise<Customer> {
    const passwordHash = await hash(customer.password, 10);
    customer.password = passwordHash;
    return await new this.customerModel(customer).save();
  }

  async updateCustomer(
    customerID: string,
    createCustomerDTO: CreateCustomerDTO,
  ): Promise<Customer> {
    const updatedCustomer = await this.customerModel.findByIdAndUpdate(
      customerID,
      createCustomerDTO,
      { new: true },
    );
    return updatedCustomer;
  }

  async deleteCustomer(customerID: string): Promise<any> {
    const deletedCustomer = await this.customerModel.findByIdAndRemove(
      customerID,
    );
    return deletedCustomer;
  }

  async addFavorite(customerID: string, place: Place): Promise<Customer> {
    const updatedCustomer = await this.customerModel.findById(customerID);
    updatedCustomer.favorites.push(place);
    console.log(
      'User.favorite after added treatment : ' + updatedCustomer.favorites,
    );
    updatedCustomer.save();
    return updatedCustomer;
  }

  async deleteFavorite(customerID: string, place: Place): Promise<Customer> {
    const updatedCustomer = await this.customerModel.findById(customerID);
    const index = updatedCustomer.favorites.indexOf(place._id);
    if (index > -1) {
      updatedCustomer.favorites.splice(index, 1);
    }
    console.log(
      'User.favorite after deleted treatment : ' + updatedCustomer.favorites,
    );
    updatedCustomer.save();
    return updatedCustomer;
  }
}
