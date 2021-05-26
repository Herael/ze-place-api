import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { hash } from 'bcrypt';
import { Promo } from 'src/promo/interfaces/promo.interface';
import { Place } from '../place/interfaces/place.interface';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
    @InjectModel('Promo') private readonly promoModel: Model<Promo>,
  ) {}

  async getAllCustomer(): Promise<Customer[]> {
    const customers = await this.customerModel.find().exec();
    return customers;
  }

  async findById(customerID: string): Promise<Customer> {
    const customer = await this.customerModel.findById(customerID).exec();
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

  async addPromoCode(promoCodeName: Promo, customerID: string): Promise<any> {
    const code = await this.promoModel
      .findOne({ name: promoCodeName.name })
      .exec();
    const custo = await this.customerModel.findById(customerID).exec();
    console.log(code._id);

    if (code != undefined) {
      if (code.user_limit > 0) {
        if (code.end_date > new Date()) {
          if (
            !custo.promoCode.includes(promoCodeName.name) &&
            !custo.historyCode.includes(promoCodeName.name)
          ) {
            const customer = await this.customerModel
              .findOneAndUpdate(
                { _id: customerID },
                { $push: { promoCode: code._id } },
              )
              .exec();
            const promo = await this.promoModel.findOneAndUpdate(
              { _id: code._id },
              { user_limit: code.user_limit - 1 },
            );
            return customer;
          } else {
            return 'vous avez deja ce code promo actif';
          }
        } else {
          return "La date d'activité du code est depassé";
        }
      } else {
        return 'Le code a deja rassemblé tout ses utilisateur';
      }
    } else {
      return "Le code n'existe pas ";
    }
  }

  async addFavorite(customerID: string, place: Place): Promise<Customer> {
    const updatedCustomer = await this.customerModel.findById(customerID);
    updatedCustomer.favorites.push(place);
    updatedCustomer.save();
    return updatedCustomer;
  }

  async deleteFavorite(customerID: string, placeId: string): Promise<Customer> {
    const updatedCustomer = await this.customerModel.findById(customerID);
    updatedCustomer.favorites = updatedCustomer.favorites.filter(
      (item) => item._id.toString() !== placeId,
    );
    updatedCustomer.save();
    return updatedCustomer;
  }
}
