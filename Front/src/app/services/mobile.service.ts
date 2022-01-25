import { Injectable, QueryList, ViewChildren } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { AdminSettingsService } from "src/app/services/AdminSettings.service";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";


@Injectable({
    providedIn: "root",
})
export class MobileService {

    public DataLoading: boolean = false;
    public Role: string = '';

    constructor(
        public http: HttpClient,
        private _AdminSettingsService: AdminSettingsService,
        private _snackBar: MatSnackBar,
        private router: Router
    ) { }

    API_MOBILE(opcion: any, data: any) {
        this._AdminSettingsService.cargarValoresLocalStorage();
        let tkJwt = this._AdminSettingsService.MyData.token;
        let headers = new HttpHeaders();
        headers = headers.set("token", tkJwt);

        let QueryData = {
            opcion: opcion,
            json: data,
        };
        // console.log(QueryData);
        this.DataLoading = !this.DataLoading;
        return this.http
            .post(environment.apiServer + environment.apiserverRutas.mobile, QueryData)
            .pipe(
                map((resp: any) => {
                    // console.log(resp);
                    this.DataLoading = !this.DataLoading;
                    let data = resp.message.message.data
                    return data;
                })
            )
            .pipe(
                catchError((err) => {
                    // console.log(err);
                    this.DataLoading = !this.DataLoading;
                    this._snackBar.open(err.error.message.message, 'Aceptar', { duration: 3000 });
                    // console.log("Error no controlado " + JSON.stringify(err));
                    return throwError(err);
                })
            );
    }

}
