"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const place_service_1 = require("./place.service");
const place_controller_1 = require("./place.controller");
const place_schema_1 = require("./schemas/place.schema");
const customer_schema_1 = require("../customer/schemas/customer.schema");
const booking_schema_1 = require("../booking/schemas/booking.schema");
let PlaceModule = class PlaceModule {
};
PlaceModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Place', schema: place_schema_1.PlaceSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Customer', schema: customer_schema_1.CustomerSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Booking', schema: booking_schema_1.BookingSchema }]),
        ],
        controllers: [place_controller_1.PlaceController],
        providers: [place_service_1.PlaceService],
        exports: [place_service_1.PlaceService],
    })
], PlaceModule);
exports.PlaceModule = PlaceModule;
//# sourceMappingURL=place.module.js.map