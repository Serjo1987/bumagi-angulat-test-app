import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { formatDate } from '@angular/common';
import { interval } from 'rxjs';
import { ListModalComponent } from './list-modal.component/list-modal.component';
import { ApiService, CookieService } from '../../shared/services/_index';
import { ToastrService } from 'ngx-toastr';

export interface DialogData {
  avatar: string;
  balance: number;
  fname: string;
  id: number;
  lastUpdatedAt: string;
  mname: string;
  name: string;
  status: number;
}

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private cookie: CookieService,
    private toastr: ToastrService
  ) {
    interval(5000).subscribe(x => {
      if (x < 1) this.getUserList(true, 'https://frontend-test.cloud.technokratos.com/users');
      else if (x > 0) this.getUserList(false, 'https://frontend-test.cloud.technokratos.com/users');
    });
  }

  public dataLoaded: boolean = false;
  public userList: any;
  public categories: any = {
    all: true,
    blocked: false,
    active: false
  };

  public openDialog(user): void {
    const dialogRef = this.dialog.open(ListModalComponent, {
      panelClass: 'user-edit-dialog',
      width: 'auto',
      data: {
        avatar: user.avatar,
        balance: user.balance,
        fname: user.fname,
        id: user.id,
        lastUpdatedAt: user.lastUpdatedAt,
        mname: user.mname,
        name: user.name,
        status: user.status
      }
    });

    const editUserSubscribe = dialogRef.componentInstance.onEdit.subscribe((result) => {
      this.userList[this.userList.findIndex(u => u.id == result.body.id)] = result.body;
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  private getUserList(err, url) {
    this.api.get(
      url,
      {},
      [{name: 'Authorization', value: this.cookie.getCookie('BumagiComTestAuth')}]
    ).then(response => {
      if (response) {
        this.dataLoaded = true;
        this.userList = response.body.sort((a, b) => a.id - b.id);
      }
    }).catch(error => {
      if (err) {
        this.userList = undefined;
        this.dataLoaded = false;
        this.responseError();
      }
    });
  }

  public getFormatDate(date) {
    return formatDate(new Date(date), 'ss', 'en');
  }

  public getStatus(status) {
    switch (status) {
      case 0: return 'Активен'; break;
      case 1: return 'Приостановлен'; break;
      case 2: return 'Заблокирован'; break;
    }
  }

  public responseError() {
    this.toastr.error("Не удалось загрузить данные о пользователе, автоматическое обновление произойдет через 5 секунд, пожалуйста подождите",'Ошибка сервера');
  }
}
