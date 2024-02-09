import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from './material.module';
import { ConfirmDialogComponent } from '../popup/pages/confirm-dialog/confirm-dialog.component';
import { CustomDialogComponent } from '../popup/pages/custom-dialog/custom-dialog.component';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [

    ConfirmDialogComponent,
    CustomDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CdkDrag,
    CdkDragHandle
  ],
  exports: [
    ConfirmDialogComponent
  ],
})
export class PopupModule { }
