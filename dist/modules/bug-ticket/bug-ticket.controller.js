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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BugTicketController = void 0;
const common_1 = require("@nestjs/common");
const bug_ticket_service_1 = require("./bug-ticket.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let BugTicketController = class BugTicketController {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    async addBugTicket(res, req) {
        console.log(req.body);
        const result = await this.ticketService.addTicket(req.body);
        console.log(result);
        return res.status(common_1.HttpStatus.OK).json({
            data: result,
        });
    }
    async getBugTicket(res) {
        const result = await this.ticketService.getTicket();
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async changeTag(res, req) {
        const result = await this.ticketService.changeTag(req.body);
        return res.status(common_1.HttpStatus.OK).json({
            data: result,
        });
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(),
    __param(0, common_1.Res()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BugTicketController.prototype, "addBugTicket", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BugTicketController.prototype, "getBugTicket", null);
__decorate([
    common_1.Post('/changeTag'),
    __param(0, common_1.Res()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BugTicketController.prototype, "changeTag", null);
BugTicketController = __decorate([
    common_1.Controller('bug-ticket'),
    __metadata("design:paramtypes", [bug_ticket_service_1.BugTicketService])
], BugTicketController);
exports.BugTicketController = BugTicketController;
//# sourceMappingURL=bug-ticket.controller.js.map