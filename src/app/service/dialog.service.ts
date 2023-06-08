import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matdialog: MatDialog) { }

  openAuth() {
    this.matdialog.open(AuthComponent, {
      width: '400px',
      height: '400px',

    });
  }

  closAuth() {
    this.matdialog.closeAll()
  }
}
