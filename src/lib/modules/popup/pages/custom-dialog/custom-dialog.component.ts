import { Component, ViewChild, ViewContainerRef, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html'
})
export class CustomDialogComponent implements OnInit  {
  name = 'CustomDialog';
  @ViewChild('container', { static: true, read: ViewContainerRef })
  entry!: ViewContainerRef;
  resizable: boolean = false;
  move: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<CustomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.entry.clear();
    const componentRef = this.entry.createComponent(this.data.component);
    componentRef.instance[`dialogRef`] = this.dialogRef;
    
    this.resizable = this.data.resizable === true;
    this.move = this.data.move === true;

    if(this.resizable) {
      document.querySelector('.cdk-overlay-container').classList.add('body-limit-cdk-drag');
    }

    const elementMatDialogContainer = document.querySelector(`#${componentRef.instance[`dialogRef`].id}`);
    const elementMatCard: any = elementMatDialogContainer?.querySelector(`app-custom-dialog>*>mat-card`);

    if(this.data?.width?.split('%')?.length === 2) {
      elementMatCard.style.width = `${Number(window.innerWidth)  * Number(this.data.width.split('%')[0]) / 100}px`;
    }else if(this.data?.width?.split('px')?.length === 2) {
      elementMatCard.style.width = this.data.width;
    }else {
      elementMatCard.style.width = `${Number(window.innerWidth)  * 0.5}px`;
    }
    
    if(componentRef.instance[`dialogRef`]?._ref?.overlayRef?._pane?.id) {
      document.getElementById(componentRef.instance[`dialogRef`]._ref.overlayRef._pane.id).style.width = 'auto';
    }
    
    if(this.data?.minWidth) {
      elementMatCard.style.minWidth = this.data.minWidth;
      if(componentRef?.instance[`dialogRef`]?._ref?.overlayRef?._pane?.id) {
        document.getElementById(componentRef.instance[`dialogRef`]._ref.overlayRef._pane.id).style.minWidth = this.data.minWidth;
      }
    }

    if(this.data?.minHeight) {
      elementMatCard.style.minHeight = this.data.minHeight;
      if(componentRef.instance[`dialogRef`]?._ref?.overlayRef?._pane?.id) {
        document.getElementById(componentRef.instance[`dialogRef`]._ref.overlayRef._pane.id).style.minHeight = this.data.minHeight;
      }
    }

    for (const item in this.data.data) {
      componentRef.instance[item] = this.data.data[item];
    }
  }

  close() {
    this.dialogRef.close();
  }
}
