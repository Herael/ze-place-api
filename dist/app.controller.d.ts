import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
export declare class AppController {
    private readonly appService;
    private authService;
    constructor(appService: AppService, authService: AuthService);
}
