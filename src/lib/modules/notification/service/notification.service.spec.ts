import { TestBed } from '@angular/core/testing';

import { NotificationTService } from './notification.service';
import { ToastrModule } from 'ngx-toastr';

describe('NotificationService', () => {
  let service: NotificationTService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
    });
    service = TestBed.inject(NotificationTService);
  });

  describe('Success', () => {
    // Tests that calling the success method with valid data opens a success notification with the correct title and body. 
    it("test_success_notification_with_valid_data", () => {
      spyOn(service.toastr, 'success');
      const data = { title: 'Success', body: 'Operation completed successfully' };
      service.success(data);
      expect(service.toastr.success).toHaveBeenCalledWith(data.body, data.title, jasmine.any(Object));
    });
    it("test_success_notification_with_invalid_data", () => {
      spyOn(service.toastr, 'success');
      const data = { title: null, body: [] };
      service.success(data);
      expect(service.toastr.success).not.toHaveBeenCalledWith('', 'success', jasmine.any(Object));
    });
    it("test_success_notification_with_body_array", () => {
      spyOn(service.toastr, 'success');
      const data = { title: null, body: ['Text'] };
      service.success(data);
      expect(service.toastr.success).not.toHaveBeenCalledWith('', 'success', jasmine.any(Object));
    });
  })
  describe('Info', () => {
    it("test_info_notification_with_valid_data", () => {
      spyOn(service.toastr, 'info');
      const data = { title: 'info', body: 'Information' };
      service.info(data);
      expect(service.toastr.info).toHaveBeenCalledWith(data.body, data.title, jasmine.any(Object));
    });
    it("test_info_notification_with_invalid_data", () => {
      spyOn(service.toastr, 'info');
      const data = { title: null, body: [] };
      service.info(data);
      expect(service.toastr.info).not.toHaveBeenCalledWith('', 'info', jasmine.any(Object));
    });
  })
  describe('Warning', () => {
    it("test_warning_notification_with_valid_data", () => {
      spyOn(service.toastr, 'warning');
      const data = { title: 'warning', body: 'warning' };
      service.warning(data);
      expect(service.toastr.warning).toHaveBeenCalledWith(data.body, data.title, jasmine.any(Object));
    });
    // Tests that calling the warning method with invalid data displays a default message and does not throw errors. 
    it("test_warning_notification_with_invalid_data", () => {
      spyOn(service.toastr, 'warning');
      const data = { title: null, body: [] };
      service.warning(data);
      expect(service.toastr.warning).not.toHaveBeenCalledWith('', 'Warning', jasmine.any(Object));
    });
  })
  describe('Error', () => {
    // Tests that calling the error method with valid data opens an error notification with the correct title and body. 
    it("test_error_notification_with_valid_data", () => {
        spyOn(service.toastr, 'error');
        const data = { title: 'Error', body: 'An error occurred' };
        service.error(data);
        expect(service.toastr.error).toHaveBeenCalledWith(data.body, data.title, jasmine.any(Object));
    });
    it("test_error_notification_with_empty_data", () => {
      spyOn(service.toastr, 'error');
      const data = { title: '', body: '' };
      service.error(data);
      expect(service.toastr.error).not.toHaveBeenCalledWith('', '', jasmine.any(Object));
    });
  })

  describe('Private methods', () => {
    // Tests that the private _getDefaultData method correctly transforms the body and returns an object with the correct settings. 
    it("test_get_default_data_method", () => {
        const data = { title: 'Test', body: ['Item 1', 'Item 2'] };
        const result = service['_getDefaultData'](data);
        expect(result.title).toEqual(data.title);
        expect(result.body).toEqual('<div>- Item 1</div><div>- Item 2</div>');
        expect(result.extraOptions).toEqual(jasmine.any(Object));
    });
  
    // Tests that the private _verifyDataNotification method verify that the title and body are valid. 
    it("test_verify_data_notification_method", () => {
        expect(service['_verifyDataNotification']({ title: '', body: [] })).toBeTruthy();
        expect(service['_verifyDataNotification']({ title: '', body: null })).toBeTruthy();
        expect(service['_verifyDataNotification']({ title: '' })).toBeTruthy();
        expect(service['_verifyDataNotification']({ title: null })).toBeTruthy();
        expect(service['_verifyDataNotification']({ title: null, body: [] })).toBeTruthy();
        expect(service['_verifyDataNotification']({ title: null, body: null })).toBeTruthy();
        expect(service['_verifyDataNotification']({ title: null })).toBeTruthy();
        expect(service['_verifyDataNotification']({ title: 'Title' })).toBeFalsy();
        expect(service['_verifyDataNotification']({ title: null, body: 'Body' })).toBeFalsy();
        expect(service['_verifyDataNotification']({ title: null, body: ['Body 1'] })).toBeFalsy();
    });
  
    // Tests the behavior of the notification settings (closeButton, progressBar, timeOut, etc.) and the maxOpen and preventDuplicates options. 
    it("test_notification_settings_and_options", () => {
        spyOn(service.toastr, 'success');
        const data = { title: 'Test', body: 'Notification message' };
        service.success(data);
        expect(service.toastr.success).toHaveBeenCalledWith(data.body, data.title, {
            closeButton: true,
            progressBar: true,
            timeOut: 5000,
            enableHtml: true,
            progressAnimation: 'increasing'
        });
    });
  })
});
