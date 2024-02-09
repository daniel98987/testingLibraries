import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataNotification } from '../interfaces/data.interface';
import { DefaultData } from '../interfaces/defaultData.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationTService {
  toastr = inject(ToastrService);

  /**
   * Method to transform the body and get custom settings
   * @param data contains a title element (string) and a body element (string | array)
   * @returns an object with the information and settings for the notification
   */
  private _getDefaultData(data: DataNotification): DefaultData {
    const returnData: any = {};

    returnData.title = data.title || null;
    returnData.body = '';
    if (data.body && typeof data.body === 'object' && data.body.length > 0) {
        if (data.body.length > 1) {
            for (const item of data.body) {
                returnData.body = `${returnData.body}<div>- ${item}</div>`;
            }
        } else {
            returnData.body = data.body[0];
        }
    } else {
        returnData.body = data.body;
    }
    returnData.extraOptions = {
        closeButton: true,
        progressBar: true,
        timeOut: 5000,
        enableHtml: true,
        progressAnimation: 'increasing'
    };
    return returnData;
  }

  /**
   * Open the succes notification
   * @param data contains the title and body to create the notification
   */
  success(data: DataNotification): void {
    if(this._verifyDataNotification(data)) return;
    const notificationData: DefaultData = this._getDefaultData(data);
    this.toastr.success(notificationData.body, notificationData.title, notificationData.extraOptions);
  }

  /**
   * Open the error notification
   * @param data contains the title and body to create the notification
   */
  error(data: DataNotification): void {
    if(this._verifyDataNotification(data)) return;
    const notificationData: DefaultData = this._getDefaultData(data);
    this.toastr.error(notificationData.body, notificationData.title, notificationData.extraOptions);
  }

  /**
   * Open the information notification
   * @param data contains the title and body to create the notification
   */
  info(data: DataNotification): void {
    if(this._verifyDataNotification(data)) return;
    const notificationData: DefaultData = this._getDefaultData(data);
    this.toastr.info(notificationData.body, notificationData.title, notificationData.extraOptions);
  }

  /**
   * Open the warining notification
   * @param data contains the title and body to create the notification
   */
  warning(data: DataNotification): void {
    if(this._verifyDataNotification(data)) return;
    const notificationData: DefaultData = this._getDefaultData(data);
    this.toastr.warning(notificationData.body, notificationData.title, notificationData.extraOptions);
  }

  /**
   * Verify that the title and body are valid
   * @param data contains the title and body to create the notification
   * @returns true or false
   */
  private _verifyDataNotification(data: DataNotification) {
    return (data.title === null || data.title === '') && (!data.body || data.body.length === 0);
  }
}
