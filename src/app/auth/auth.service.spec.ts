import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {StorageService} from '../shared/services/storage.service';
import {Routes} from '../shared/routes/routes';
import {LoginResponse} from './contracts/responses/LoginResponse';

describe('AuthService', () => {
  let service: AuthService;
  let storageServiceMock: any;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    storageServiceMock = jasmine.createSpyObj('StorageService', ['getItem']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        // {provide: StorageService, useValue: storageServiceMock}
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(`Authenticate tests`, () => {
    it(`Should return a valid login response`, () => {
      const response: LoginResponse = {token: 'test', refreshToken: 'test', roles: []};
      service.authenticate({email: 'validEmail', password: 'validPassword'}).subscribe(res => {
        expect(res).toEqual(response);
      });
      const mockReq = httpMock.expectOne(Routes.Auth.LOGIN);
      mockReq.flush(response);
    });
  });
});
