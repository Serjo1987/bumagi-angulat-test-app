import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../list.component';
import { ApiService, CookieService } from '../../../shared/services/_index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'list-modal',
  templateUrl: './list-modal.component.html'
})
export class ListModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ListModalComponent>,
    private api: ApiService,
    private cookie: CookieService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  @Output() onEdit = new EventEmitter<any>(true);

  public disabled: boolean = false;
  public statusList: any = {
    0: 'Активен',
    1: 'Приостановлен',
    2: 'Заблокирован'
  }

  public closeModal(e): void {
    e.preventDefault();

    this.dialogRef.close();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  private onEditError() {
    this.toastr.error("Не удалось обновить данные о пользователе, попробуйте поворить попытку позже",'Произошла ошибка');
  }

  public editUser(e) {
    this.disabled = true;
    this.api.patch(
      'https://frontend-test.cloud.technokratos.com/users/' + this.data.id,
      {
        name: this.data.name,
        fname: this.data.fname,
        mname: this.data.mname,
        status: this.data.status
      },
      [{name: 'Authorization', value: this.cookie.getCookie('BumagiComTestAuth')}]
    ).then(response => {
      if (response && response.message) {
        this.disabled = false;
        this.onEditError();
      } else if (response && !response.message) {
        this.onEdit.emit(response);
        this.dialogRef.close();
      }
    }).catch(error => {
      this.disabled = false;
      this.onEditError();
    });
  }
}
