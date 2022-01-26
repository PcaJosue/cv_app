import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  reference: MatSnackBarRef<TextOnlySnackBar>;
  constructor(private _snackBar: MatSnackBar) { }

  open(message: string, type: AlertType, duration: number = 60000) {

    const config: MatSnackBarConfig = {
      panelClass: this.getClass(type),
      duration: duration
    }
    this.reference = this._snackBar.open(message, 'close', config);
  }

  close() {
    this.reference.dismiss();
  }



  getClass(type) {
    switch (type) {
      case AlertType.Error:
        return 'alert__error';
      case AlertType.Info:
        return 'alert__info';
      case AlertType.Success:
        return 'alert__success';
      case AlertType.Warning:
        return 'alert__warning';
      default:
        break;
    }
  }

}

export enum AlertType {
  'Warning',
  'Success',
  'Info',
  'Error'
}
