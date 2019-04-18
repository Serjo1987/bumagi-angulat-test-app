import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from './shared/services/cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private cookie: CookieService, private router: Router) {}

  ngOnInit() {
    if (this.cookie.getCookie('BumagiComTestAuth')) {
      this.router.navigate(['/list']);
    }
  }
}
