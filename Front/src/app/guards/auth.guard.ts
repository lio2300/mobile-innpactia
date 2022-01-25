import { Injectable } from "@angular/core";
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from "@angular/router";

import { LoginService } from "src/app/services/login.service";
import { AdminSettingsService } from "../services/AdminSettings.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: LoginService,
        private router: Router,
        private _AdminSettingsService: AdminSettingsService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this._AdminSettingsService.cargarValoresLocalStorage();
        let token = this._AdminSettingsService.MyData;
        if (token) {
            let validation = this._AdminSettingsService.validarExpiracionToken(token);
            if (!validation) {
                this.router.navigate(["/login"]);
                return false;
            }
            return true;
        }

        this.router.navigate(["/login"]);
        return false;
    }
}
