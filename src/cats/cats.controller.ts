import { Body, Controller, Get, Post} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
    constructor(private catsServices: CatsService) {}

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsServices.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Cat[]>{
        return this.catsServices.findAll();
    }
}
