import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PopupService } from './popup.service';
import { ConfirmDialogComponent } from '../pages/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '../pages/alert-dialog/alert-dialog.component';
import { CustomDialogComponent } from '../pages/custom-dialog/custom-dialog.component';
import { ChoiceDialogComponent } from '../pages/choice-dialog/choice-dialog.component';
import { of } from 'rxjs';
import { NotificationTestComponent } from 'src/app/notification-test/notification-test.component';
import { CustomData } from '../interfaces/data-interface.interface';

describe('PopupService', () => {
  let service: PopupService;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [PopupService, MatDialog],
    });
    service = TestBed.inject(PopupService);
    dialog = TestBed.inject(MatDialog);
  });

  it('test_alert_dialog_successfully', async () => {
    const alertData = { 
      title: 'Aceptar',
      body: 'Reporte generado con éxito',
      width: '30%',
      height: '10%' };
    const callback = jasmine.createSpy('callback');

    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    const afterClosedSpy = dialogRefMock.afterClosed.and.returnValue(of('result'));

    spyOn(dialog, 'open').and.returnValue(dialogRefMock);

    const result = await service.alert(alertData, callback);    

    expect(dialog.open).toHaveBeenCalledWith(AlertDialogComponent, {
      width: alertData.width || '50%',
      data: alertData,
    });

    expect(afterClosedSpy).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith('result');
  });

  it('test_choice_dialog_successfully', async () => {
    const choiceData = { 
      disableClose: true,       
      width: '30%',
      height: '10%',
      data: {labelKey: 'label', type: 'radio', choices: []}
     };
    const callback = jasmine.createSpy('callback');

    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    const afterClosedSpy = dialogRefMock.afterClosed.and.returnValue(of('result'));

    spyOn(dialog, 'open').and.returnValue(dialogRefMock);

    const result = await service.choice(choiceData, callback);    

    expect(dialog.open).toHaveBeenCalledWith(ChoiceDialogComponent, {
      disableClose: choiceData.disableClose,
      width: choiceData.width || '30%',
      height: choiceData.height || '10%',
      data: choiceData
    });

    expect(afterClosedSpy).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith('result');
  }); 

   it('test_confirm_dialog_successfully', async () => {
    const confirmData = { width: '50%', title: 'prueba' };
    const callback = jasmine.createSpy('callback');

    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    const afterClosedSpy = dialogRefMock.afterClosed.and.returnValue(of('result'));

    spyOn(dialog, 'open').and.returnValue(dialogRefMock);

    const result = await service.confirm(confirmData, callback);    

    expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
      width: confirmData.width || '50%',
      data: confirmData,
    });

    expect(afterClosedSpy).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith('result');

  });

  it('should open custom dialog successfully', async () => {
    const customData:CustomData = {
      title: 'Abre otro componente con datos',
      component: NotificationTestComponent,
      width: '50%',
      height: 'auto',
      data: { 
        },
    };

    const callback = jasmine.createSpy('callback');

    const dialogRefMock = jasmine.createSpyObj<MatDialogRef<any>>('MatDialogRef', [
      'afterClosed',
    ]);
    const afterClosedSpy = dialogRefMock.afterClosed.and.returnValue(of('result'));

    spyOn(dialog, 'open').and.returnValue(dialogRefMock);

    const result = await service.custom(customData, callback);

    expect(dialog.open).toHaveBeenCalledWith(CustomDialogComponent, {
      width: customData.width,
      height: customData.height,
      data: customData
      }
      );
    expect(afterClosedSpy).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith('result');
  });

});
