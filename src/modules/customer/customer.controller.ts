import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Body,
  Put,
  Query,
  NotFoundException,
  Delete,
  Param,
  Logger,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { Place } from '../place/interfaces/place.interface';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async getAllCustomer(@Res() res) {
    const customers = await this.customerService.getAllCustomer();
    Logger.warn(customers);
    return res.status(HttpStatus.OK).json(customers);
  }

  @Get('/:customerID')
  async getCustomer(@Res() res, @Param('customerID') customerID) {
    const customer = await this.customerService.findById(customerID);
    if (!customer) throw new NotFoundException('Customer does not exist!');
    return res.status(HttpStatus.OK).json(customer);
  }

  // Update a customer's details
  @Put('/update')
  async updateCustomer(
    @Res() res,
    @Query('customerID') customerID,
    @Body() createCustomerDTO: CreateCustomerDTO,
  ) {
    const customer = await this.customerService.updateCustomer(
      customerID,
      createCustomerDTO,
    );
    if (!customer) throw new NotFoundException('Customer does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been successfully updated',
      customer,
    });
  }

  //Add a place to the favorite list
  @Put('/favorite/create')
  async addFavorite(
    @Res() res,
    @Query('customerID') customerID,
    @Body() place: Place,
    test: string,
  ) {
    console.log('CONTROLLER : ');
    console.log('Place : ' + place);
    console.log('Place ID : ' + place._id);
    console.log('Place Title : ' + place.title);
    console.log('Customer ID : ' + customerID);
    console.log('test : ' + test);

    const customer = await this.customerService.addFavorite(customerID, place);

    if (!customer) throw new NotFoundException('Customer does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Favorite has been successfully added',
      customer,
    });
  }

  // Delete a customer
  @Delete('/delete')
  async deleteCustomer(@Res() res, @Query('customerID') customerID) {
    const customer = await this.customerService.deleteCustomer(customerID);
    if (!customer) throw new NotFoundException('Customer does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been deleted',
      customer,
    });
  }
}
