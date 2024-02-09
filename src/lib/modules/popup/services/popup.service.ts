import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../pages/confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';
import { CustomDialogComponent } from '../pages/custom-dialog/custom-dialog.component';
import { CustomData, ConfirmData } from '../interfaces/data-interface.interface';

@Injectable({
  providedIn: 'root'
})
export class PopupService implements OnDestroy {

  private subscriptions = new Subscription();
  public dialogRef: any = null;

  constructor(public dialog: MatDialog) { }

  /**
     * @param data
     *   title: string
     *   body: string
     *   width: string
     *   labelCancel: string
     *   labelAccept: string
     */
  public confirm(data: ConfirmData, callback: Function): void | Promise<boolean> {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: data.width || '30%',
      height: 'auto',
      data
    });
    if (callback == null) {
      return dialog.afterClosed().toPromise();
    }

    this.subscriptions.add(
      dialog.afterClosed().subscribe(res => {
        callback(res);
      })
    );
  }




  /**
     * @param data
     *   title: string
     *   componente: Component
     *   width: string
     */
  public async custom(data: CustomData, callback: Function): Promise<boolean | void> {
    if (!data.data) { data.data = {}; }
    data.data.dialog = this;
    this.dialogRef = this.dialog.open(CustomDialogComponent, {

      width: data.width || '50%',
      height: 'auto',
      disableClose: true,
      data
    });

    // MACHETE KILLS
    /*setTimeout(() => {
      this.dialogRef._overlayRef._host.style.justifyContent = 'center';
    }, 100);*/

    if (callback == null) {
      return this.dialogRef.afterClosed().toPromise();
    }

    this.subscriptions.add(
      this.dialogRef.afterClosed().subscribe((res: any) => {
        callback(res);
      })
    );
  }



  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
