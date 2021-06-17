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
exports.BugTicketService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BugTicketService = class BugTicketService {
    async addTicket(data) {
        const ticket = await new this.ticketModel(data).save();
        return ticket;
    }
    async getTicket() {
        const ticket = await this.ticketModel.find().exec();
        console.log(ticket);
        return ticket;
    }
    async changeTag(data) {
        console.log('tag');
        const ticket = await this.ticketModel.findByIdAndUpdate(data.id, { tag: data.tag });
        console.log(ticket);
        return ticket;
    }
};
__decorate([
    mongoose_1.InjectModel('Ticket'),
    __metadata("design:type", mongoose_2.Model)
], BugTicketService.prototype, "ticketModel", void 0);
BugTicketService = __decorate([
    common_1.Injectable()
], BugTicketService);
exports.BugTicketService = BugTicketService;
//# sourceMappingURL=bug-ticket.service.js.map