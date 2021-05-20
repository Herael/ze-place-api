"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceTypeModule = void 0;
const common_1 = require("@nestjs/common");
const place_type_service_1 = require("./place-type.service");
const place_type_controller_1 = require("./place-type.controller");
let PlaceTypeModule = class PlaceTypeModule {
};
PlaceTypeModule = __decorate([
    common_1.Module({
        providers: [place_type_service_1.PlaceTypeService],
        controllers: [place_type_controller_1.PlaceTypeController]
    })
], PlaceTypeModule);
exports.PlaceTypeModule = PlaceTypeModule;
//# sourceMappingURL=place-type.module.js.map