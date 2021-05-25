import { Module } from '@nestjs/common';
import { PlaceTypeService } from './place-type.service';
import { PlaceTypeController } from './place-type.controller';

@Module({
  providers: [PlaceTypeService],
  controllers: [PlaceTypeController]
})
export class PlaceTypeModule {}
