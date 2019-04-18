import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private cookie: CookieService, private router: Router) {}

  canActivate(): boolean {
    if (!this.cookie.getCookie('BumagiComTestAuth')) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
