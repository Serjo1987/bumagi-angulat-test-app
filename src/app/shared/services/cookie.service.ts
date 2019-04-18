import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  public getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");

    if (parts.length == 2) {
      return parts.pop().split(";").shift();
    }
  }

  public setCookie(name: string, value: string, expireDays: number, path: string = '') {
    let d:Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);

    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = path ? `; path=${path}` : '';

    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }
}
