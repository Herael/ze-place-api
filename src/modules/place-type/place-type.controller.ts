import { Controller, Post,Res,Body,HttpStatus } from '@nestjs/common';
import { PlaceTypeService } from './place-type.service';

@Controller('place-type')
export class PlaceTypeController {

    constructor(private typeService: PlaceTypeService) {}


    @Post()
    async createType(@Res() res, @Body() data){
        console.log(data);
        const places = await this.typeService.createType(data);
    return res.status(HttpStatus.OK).json(places);
    }
    @Post('/features')
    async createFeatures(@Res() res, @Body() data){
        console.log(data);
        const places = await this.typeService.createFeatures(data);
    return res.status(HttpStatus.OK).json(places);
    }
}


