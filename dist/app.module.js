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
const schedule_1 = require("@nestjs/schedule");
const customer_module_1 = require("./modules/customer/customer.module");
const place_module_1 = require("./modules/place/place.module");
const review_place_module_1 = require("./modules/review-place/review-place.module");
const auth_module_1 = require("./modules/auth/auth.module");
const promo_module_1 = require("./modules/promo/promo.module");
const place_type_module_1 = require("./modules/place-type/place-type.module");
const feature_module_1 = require("./modules/feature/feature.module");
const payment_module_1 = require("./modules/payment/payment.module");
const booking_module_1 = require("./modules/booking/booking.module");
const app_gateway_1 = require("./app.gateway");
const bug_ticket_module_1 = require("./modules/bug-ticket/bug-ticket.module");
const conversation_module_1 = require("./modules/conversation/conversation.module");
const message_module_1 = require("./modules/message/message.module");
const conversation_schema_1 = require("./modules/conversation/schemas/conversation.schema");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost/ze-place-api', { useNewUrlParser: true, useFindAndModify: false }),
            mongoose_1.MongooseModule.forFeature([
                { name: 'Conversation', schema: conversation_schema_1.ConversationSchema },
            ]),
            customer_module_1.CustomerModule,
            place_module_1.PlaceModule,
            review_place_module_1.ReviewPLaceModule,
            auth_module_1.AuthModule,
            promo_module_1.PromoModule,
            place_type_module_1.PlaceTypeModule,
            feature_module_1.FeatureModule,
            payment_module_1.PaymentModule,
            bug_ticket_module_1.BugTicketModule,
            conversation_module_1.ConversationModule,
            schedule_1.ScheduleModule.forRoot(),
            booking_module_1.BookingModule,
            message_module_1.MessageModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, app_gateway_1.AppGateway],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map