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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const customer_service_1 = require("../customer/customer.service");
const customer_interface_1 = require("../customer/interfaces/customer.interface");
const bcrypt_1 = require("bcrypt");
const python_shell_1 = require("python-shell");
const stripe = require('stripe')('sk_test_51IvjYaIeDqziwrFRLUS2L2qYbBDUL4YbhnwDVkU5S7bXNQmIaGh0wn24V9CxOao50ai5VOBrzMYDNXf5itqXSlSL00O3CdBEw7');
let AuthService = class AuthService {
    constructor(customerService, jwtService) {
        this.customerService = customerService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.customerService.findByEmail(email);
        const isValid = await bcrypt_1.compare(password, user.password);
        if (isValid) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.email, id: user._id };
        return {
            access_token: this.jwtService.sign(payload),
            user: user,
        };
    }
    async uploadID(data) {
        const IDRecto = await stripe.files.create({
            purpose: 'identity_document',
            file: {
                data: data[0].buffer,
                name: data[0].originalName,
                type: 'application/octet-stream',
            },
        });
        const IDVerso = await stripe.files.create({
            purpose: 'identity_document',
            file: {
                data: data[1].buffer,
                name: data[1].originalName,
                type: 'application/octet-stream',
            },
        });
        return [IDRecto.id, IDVerso.id];
    }
    async register(customer) {
        const token = await this.createToken(customer);
        const account = await stripe.accounts.create({
            type: 'custom',
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
            business_profile: {
                support_url: 'www.google.com',
                url: 'www.google.com',
                mcc: '6513',
            },
            account_token: token.id,
        });
        customer.stripeAccount = account.id;
        const user = await this.customerService.addCustomer(customer);
        if (user == null) {
            return null;
        }
        const payload = { email: user.email, id: user._id };
        return {
            access_token: this.jwtService.sign(payload),
            user: user,
        };
    }
    async createToken(customer) {
        const birthdate = customer.birthdate.toString().split('-');
        try {
            const token = await stripe.tokens.create({
                account: {
                    business_type: 'individual',
                    individual: {
                        first_name: customer.first_name,
                        last_name: customer.last_name,
                        email: customer.email,
                        address: {
                            city: customer.location.city,
                            country: 'FR',
                            postal_code: customer.location.postalCode,
                            line1: customer.location.address,
                        },
                        dob: {
                            day: birthdate[2].substr(0, 2),
                            month: birthdate[1],
                            year: birthdate[0],
                        },
                        gender: customer.gender,
                        phone: `+33${customer.phoneNumber.substring(1)}`,
                        verification: {
                            document: {
                                back: customer.IDVerso,
                                front: customer.IDRecto,
                            },
                            additional_document: {
                                back: customer.IDVerso,
                                front: customer.IDRecto,
                            },
                        },
                    },
                    tos_shown_and_accepted: true,
                },
            });
            return token;
        }
        catch (err) {
        }
    }
    async getUser(credentials) {
        return await this.customerService.findById(credentials.id);
    }
    runPython() {
        const pythonFolder = 'ml/';
        python_shell_1.PythonShell.defaultOptions = {
            scriptPath: pythonFolder,
        };
        python_shell_1.PythonShell.run('script.py', null, function (err, results) {
            if (err) {
                return;
            }
        });
        return;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [customer_service_1.CustomerService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map