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
export class NoAuthGuard implements CanActivate {
    constructor(
        private authService: LoginService,
        private router: Router,
        private _AdminSettingsService: AdminSettingsService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this._AdminSettingsService.cargarValoresLocalStorage();
        let token = this._AdminSettingsService.MyData;
        if (!token) {
            return true;
        }

        this.router.navigate(["/dashboard"]);
        return false;
    }
}
