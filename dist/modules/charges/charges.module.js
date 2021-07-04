"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargesModule = void 0;
const common_1 = require("@nestjs/common");
const charges_service_1 = require("./charges.service");
const charges_controller_1 = require("./charges.controller");
const mongoose_1 = require("@nestjs/mongoose");
const charges_schema_1 = require("./schema/charges.schema");
let ChargesModule = class ChargesModule {
};
ChargesModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Charges', schema: charges_schema_1.ChargesSchema }]),
        ],
        providers: [charges_service_1.ChargesService],
        controllers: [charges_controller_1.ChargesController],
        exports: [charges_service_1.ChargesService],
    })
], ChargesModule);
exports.ChargesModule = ChargesModule;
//# sourceMappingURL=charges.module.js.map