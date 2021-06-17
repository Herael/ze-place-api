"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BugTicketModule = void 0;
const common_1 = require("@nestjs/common");
const bug_ticket_controller_1 = require("./bug-ticket.controller");
const ticket_schema_1 = require("./schemas/ticket.schema");
const mongoose_1 = require("@nestjs/mongoose");
const bug_ticket_service_1 = require("./bug-ticket.service");
let BugTicketModule = class BugTicketModule {
};
BugTicketModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Ticket', schema: ticket_schema_1.TicketSchema }]),
        ],
        controllers: [bug_ticket_controller_1.BugTicketController],
        providers: [bug_ticket_service_1.BugTicketService],
        exports: [bug_ticket_service_1.BugTicketService],
    })
], BugTicketModule);
exports.BugTicketModule = BugTicketModule;
//# sourceMappingURL=bug-ticket.module.js.map