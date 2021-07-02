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
  Request,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { Place } from '../place/interfaces/place.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async getAllCustomer(@Res() res) {
    const customers = await this.customerService.getAllCustomer();
    return res.status(HttpStatus.OK).json(customers);
  }

  @Get('/:customerID')
  async getCustomer(@Res() res, @Param('customerID') customerID) {
    const customer = await this.customerService.findById(customerID);
    if (!customer) throw new NotFoundException('Customer does not exist!');
    return res.status(HttpStatus.OK).json(customer);
  }

  @Get('/email/:email')
  async getCustomerByEmail(@Res() res, @Param('email') email) {
    const customer = await this.customerService.findByEmail(email);
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

  @UseGuards(JwtAuthGuard)
  @Post('/favorite/create')
  async addFavorite(@Request() req, @Res() res, @Body() place: Place) {
    await this.customerService.addFavorite(req.user.id, place);
    return res.status(HttpStatus.OK).json({
      message: 'Favorite has been successfully added',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/favorite/delete/:placeID')
  async deleteFavorite(@Request() req, @Res() res, @Param('placeID') placeID) {
    await this.customerService.deleteFavorite(req.user.id, placeID);
    return res.status(HttpStatus.OK).json({
      message: 'Favorite has been successfully deleted',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async deleteCustomer(@Res() res, @Query('customerID') customerID) {
    const customer = await this.customerService.deleteCustomer(customerID);
    if (!customer) throw new NotFoundException('Customer does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been deleted',
      customer,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/addPromoCode')
  async addPromoCode(
    @Res() res,
    @Request() req,
    @Query('customerID') customerID,
  ) {
    console.log(req.body);
    const result = await this.customerService.addPromoCode(
      req.body,
      customerID,
    );
    console.log(result);

    return res.status(HttpStatus.OK).json({
      data: result,
    });
  }

  @Post('/setToHistory')
  async setToHistory(@Res() res ,@Request() req){
    
    
    const code = await this.customerService.setToHistory(req.body);    
    console.log(code);      
    return res.status(HttpStatus.OK).json(code)
  }
}
