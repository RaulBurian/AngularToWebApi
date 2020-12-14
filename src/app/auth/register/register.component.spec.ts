import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';
import {AuthService} from '../auth.service';
import {of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {DOMHelper} from '../../../testing/DOMHelper';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['register', 'currentUserValue']);
    await TestBed.configureTestingModule({
      declarations: [
        RegisterComponent
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {path: 'home', component: DummyComponent},
        ])
      ],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
      ]
    })
      .compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Register Component valid register', () => {
    beforeEach(() => {
      authServiceMock.register.and.returnValue(of({
        token: 'token', refreshToken: 'refresh', roles: []
      }));
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(RegisterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(`should redirect to the return url if registered `, () => {
      const helper: DOMHelper<RegisterComponent> = new DOMHelper<RegisterComponent>(fixture);
      const router: Router = TestBed.inject(Router);
      const navSpy = spyOn(router, 'navigate');
      const button: HTMLHeadElement = helper.singleElement('button');
      button.click();
      fixture.detectChanges();
      expect(navSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Register Component invalid register', () => {
    beforeEach(() => {
      authServiceMock.register.and.returnValue(throwError({
        error: {
          errors: [{
            message: 'testError'
          }]
        }
      }));
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(RegisterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(`should show errors if registered `, () => {
      const helper: DOMHelper<RegisterComponent> = new DOMHelper<RegisterComponent>(fixture);
      const alertSpy = spyOn(window, 'alert');
      const button: HTMLHeadElement = helper.singleElement('button');
      button.click();
      fixture.detectChanges();
      expect(alertSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe(`Register component redirect`, () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(RegisterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(`Should redirect to returnUrl if logged in`, () => {
      authServiceMock.currentUserValue.and.returnValue(true);
      const router: Router = TestBed.inject(Router);
      const navSpy = spyOn(router, 'navigate');
      fixture = TestBed.createComponent(RegisterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(navSpy).toHaveBeenCalledTimes(1);
    });
  });
});


@Component({template: ''})
class DummyComponent {
}
