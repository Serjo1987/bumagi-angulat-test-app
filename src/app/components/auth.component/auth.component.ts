import { Component, OnInit } from '@angular/core';
import { ApiService, CookieService } from '../../shared/services/_index';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(
    private api: ApiService,
    private cookie: CookieService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  public login: string;
  public password: string;
  public validate: any = {
    login: false,
    password: false
  };

  public disabled: boolean = false;
  private regExpEmail: any = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  ngOnInit() {
    this.login = 'test@example.com';
    this.password = '1q2w3e';
  }

  private onAuthError() {
    this.toastr.error("Не верный логин и/или пароль",'Произошла ошибка');
  }

  private onLoginEmpty() {
    this.toastr.error("Поле логин не валидно",'Произошла ошибка');
  }

  private onPasswordEmpty() {
    this.toastr.error("Поле пароль не должно быть пустым",'Произошла ошибка');
  }

  public togglePasswordVisibility(e) {
    let password = document.getElementById('password');

    if (!e.target.classList.contains('fa-eye-slash')) {
      e.target.classList.remove('fa-eye');
      e.target.classList.add('fa-eye-slash');

      password.setAttribute('type', 'text');
    } else {
      e.target.classList.remove('fa-eye-slash');
      e.target.classList.add('fa-eye');

      password.setAttribute('type', 'password');
    }
  }

  public auth(e) {
    if (!this.login.match(this.regExpEmail)) {
      this.validate.login = true;
      this.onLoginEmpty();
    } else {
      this.validate.login = false;
    }

    if (this.password == '') {
      this.validate.password = true;
      this.onPasswordEmpty();
    } else {
      this.validate.password = false;
    }

    if (!this.validate.login && !this.validate.password) {
      this.disabled = true;
      this.api.post(
        'https://frontend-test.cloud.technokratos.com/auth',
        {login: this.login, password: this.password},
        [{name: 'access-control-expose-headers', value: 'Authorization'}]
      ).then(response => {
        if (response) {
          this.cookie.setCookie('BumagiComTestAuth', response.headers.get('authorization'), 10);
          this.router.navigate(['/list']);
        }
      }).catch(error => {
        this.disabled = false;
        this.onAuthError();
      });
    }
  }
}
