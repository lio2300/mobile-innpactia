import { Injectable, QueryList, ViewChildren } from "@angular/core";
import { dominio_ws } from "../config/SettingsGlobal";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { AdminSettingsService } from "./AdminSettings.service";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";


@Injectable({
  providedIn: "root",
})
export class LoginService {

  public DataLoading: boolean = false;
  public Role: string = '';

  constructor(
    public http: HttpClient,
    private _AdminSettingsService: AdminSettingsService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ValidatorData(opcion: any, data: any) {
    // this._AdminSettingsService.cargarValoresLocalStorage();
    // let tkJwt = this._AdminSettingsService.MyData.token;
    // let headers = new HttpHeaders();
    // headers = headers.set("token", tkJwt);

    let QueryData = {
      opcion: opcion,
      json: data,
    };

    return this.http
      // .post(`${environment.apiServer + environment.apiserverRutas.login}`, QueryData, { headers })
      .post(`${environment.apiServer + environment.apiserverRutas.login}`, QueryData)
      .pipe(
        map((resp: any) => {
          console.log(resp);
          if (opcion === 'L') {
            let data = resp.message.token;
            this.Role = resp.message.message.data.user_role;
            this._AdminSettingsService.limpiarTokenUser();
            this._AdminSettingsService.crearTokenUsuarioLocalStorage(data);
            this.router.navigate(['/dashboard']);
          }
          if (opcion === 'R') {
            this._snackBar.open(resp.message.message.message, 'Aceptar', { duration: 3000 });
            this.router.navigate(['/login']);
          }
          this.DataLoading = !this.DataLoading;
          return data;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          this.DataLoading = !this.DataLoading;
          this._snackBar.open(err.error.message.message, 'Aceptar', { duration: 3000 });
          // console.log("Error no controlado " + JSON.stringify(err));
          return throwError(err);
        })
      );
  }

}
