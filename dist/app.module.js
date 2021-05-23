"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const customer_module_1 = require("./modules/customer/customer.module");
const place_module_1 = require("./modules/place/place.module");
const review_module_1 = require("./modules/review/review.module");
const auth_module_1 = require("./modules/auth/auth.module");
const place_type_module_1 = require("./modules/place-type/place-type.module");
const feature_module_1 = require("./modules/feature/feature.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost/ze-place-api', { useNewUrlParser: true, useFindAndModify: false }),
            customer_module_1.CustomerModule,
            place_module_1.PlaceModule,
            review_module_1.ReviewModule,
            auth_module_1.AuthModule,
            place_type_module_1.PlaceTypeModule,
            feature_module_1.FeatureModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map