import { Controller, Post,Res,Body,HttpStatus, Get } from '@nestjs/common';
import { PlaceTypeService } from './place-type.service';

@Controller('place-type')
export class PlaceTypeController {

    constructor(private typeService: PlaceTypeService) {}


    @Post()
    async createType(@Res() res, @Body() data){
        const places = await this.typeService.createType(data);
    return res.status(HttpStatus.OK).json(places);
    }
    @Post('/features')
    async createFeatures(@Res() res, @Body() data){
        const places = await this.typeService.createFeatures(data);
    return res.status(HttpStatus.OK).json(places);
    }
    @Get()
    async getType(@Res() res){
        const type = await this.typeService.getType()
        return res.status(HttpStatus.OK).json(type);
    }
    @Get('/features')
    async getFeatures(@Res() res){
        const type = await this.typeService.getFeatures()
        return res.status(HttpStatus.OK).json(type);
    }
}


