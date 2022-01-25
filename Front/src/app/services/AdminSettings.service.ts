import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Title } from "@angular/platform-browser";
import jwt_decode from "jwt-decode";
import * as moment from "moment";
import * as CryptoJS from "crypto-js";
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AdminSettingsService {
  MyData: any;
  Roles: any;
  Logged: any = false;

  constructor(private router: Router) {
    this.cargarValoresLocalStorage();
  }

  crearTokenUsuarioLocalStorage(data: any) {
    if (!localStorage.getItem("Innpactia")) {
      localStorage.setItem("Innpactia", (this.MyData = data));
    }
  }

  editDataUsuario(newData: string) {
    localStorage.setItem("Innpactia", newData);
  }

  cargarValoresLocalStorage() {
    this.MyData = localStorage.getItem("Innpactia");
    if (this.MyData != undefined) {
      this.Logged = true;
    } else {
      this.Logged = false;
    }
  }

  //validar si token ya expiro
  validarExpiracionToken(token: any) {
    if (localStorage.getItem("Innpactia")) {
      let decodedToken = this.getDecodedAccessToken(token);
      let expirationDate = decodedToken.exp; // get token expiration dateTime
      if (Number(moment().format("X")) > Number(expirationDate)) {
        return false; //token expiro
      } else {
        return true; //token todavia valido
      }
    } else {
      return false;
    }
  }

  limpiarTokenUser() {
    if (localStorage.getItem("Innpactia")) {
      localStorage.removeItem("Innpactia");
      localStorage.removeItem("Innpactia");
      this.MyData = {};
      this.Roles = {};
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      console.log(Error)
      return null;
    }
  }

  encryptData(data: any) {
    try {
      return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        "asdREAGKO248ad2167gd1jnk140954by2r6nxu3yy23vu43"
      ).toString();
    } catch (e) {
      return '';
      //console.log(e);
    }
  }

  /*encryptMd5(data){
    let hash = Md5.hashStr(data+"");
    return hash;
  }*/

  decryptData(data: any) {
    try {
      const bytes = CryptoJS.AES.decrypt(
        data,
        "asdREAGKO248ad2167gd1jnk140954by2r6nxu3yy23vu43"
      );
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      //console.log(e);
    }
  }
}
