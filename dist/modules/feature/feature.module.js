"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureModule = void 0;
const common_1 = require("@nestjs/common");
const feature_service_1 = require("./feature.service");
const feature_controller_1 = require("./feature.controller");
let FeatureModule = class FeatureModule {
};
FeatureModule = __decorate([
    common_1.Module({
        providers: [feature_service_1.FeatureService],
        controllers: [feature_controller_1.FeatureController]
    })
], FeatureModule);
exports.FeatureModule = FeatureModule;
//# sourceMappingURL=feature.module.js.map