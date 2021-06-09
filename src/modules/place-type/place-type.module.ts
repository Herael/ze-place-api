import { Module } from '@nestjs/common';
import { PlaceTypeService } from './place-type.service';
import { PlaceTypeController } from './place-type.controller';
import { PlaceTypeSchema,PlaceFeaturesSchema } from './schemas/place-type.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({ imports: [
  MongooseModule.forFeature([{ name: 'Type', schema: PlaceTypeSchema }]),
  MongooseModule.forFeature([{ name: 'Features', schema: PlaceFeaturesSchema }]),

],
controllers: [PlaceTypeController],
providers: [PlaceTypeService],
exports: [PlaceTypeService],
})
export class PlaceTypeModule {}
