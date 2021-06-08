"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlaceDTO = void 0;
const class_validator_1 = require("class-validator");
const booking_interface_1 = require("../../booking/interfaces/booking.interface");
const feature_interface_1 = require("../../feature/interfaces/feature.interface");
const place_type_interface_1 = require("../../place-type/interfaces/place-type.interface");
const review_interface_1 = require("../../review/interfaces/review.interface");
const types_1 = require("../../types");
class CreatePlaceDTO {
    constructor() {
        this.features = [];
        this.images = [];
        this.reviews = [];
        this.bookings = [];
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreatePlaceDTO.prototype, "title", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreatePlaceDTO.prototype, "aboutUser", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreatePlaceDTO.prototype, "surface", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], CreatePlaceDTO.prototype, "price", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreatePlaceDTO.prototype, "rentingDuration", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreatePlaceDTO.prototype, "description", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreatePlaceDTO.prototype, "authorizeAnimals", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreatePlaceDTO.prototype, "authorizeMusic", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreatePlaceDTO.prototype, "authorizeSmoking", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreatePlaceDTO.prototype, "authorizeFire", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreatePlaceDTO.prototype, "authorizeFoodAndDrink", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreatePlaceDTO.prototype, "ownerId", void 0);
exports.CreatePlaceDTO = CreatePlaceDTO;
//# sourceMappingURL=create-place.dto.js.map