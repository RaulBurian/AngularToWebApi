import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../auth.service';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {UserModel} from '../../shared/models/user.model';
import {Router} from '@angular/router';
import {Component} from '@angular/core';
import {DOMHelper} from '../../../testing/DOMHelper';
import {AuthenticationRequest} from '../contracts/requests/AuthenticationRequest';
import {LoginResponse} from '../contracts/responses/LoginResponse';

describe('LoginComponent logged out', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'home', component: DummyComponent}
        ]),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {provide: AuthService, useClass: AuthServiceStub},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    Helper.clear();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should go to return url or home when logging in successfully`, () => {
    const router: Router = TestBed.inject(Router);
    const domHelper = new DOMHelper<LoginComponent>(fixture);
    const navSpy = spyOn(router, 'navigate');
    const button: HTMLHeadElement = domHelper.singleElement('button');
    component.loginForm.setValue({
      email: 'goodEmail',
      password: 'goodPassword'
    });
    fixture.detectChanges();
    button.click();
    fixture.detectChanges();
    expect(navSpy).toHaveBeenCalled();
  });

  it(`should show an alert when entering invalid credentials`, () => {
    const router: Router = TestBed.inject(Router);
    const domHelper = new DOMHelper<LoginComponent>(fixture);
    const navSpy = spyOn(router, 'navigate');
    const button = domHelper.singleElement('button');
    component.loginForm.setValue({
      email: 'invalid',
      password: 'invalid'
    });
    fixture.detectChanges();
    button.click();
    fixture.detectChanges();
    expect(navSpy).toHaveBeenCalledTimes(0);
  });
});

describe('LoginComponent logged in', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'home', component: DummyComponent}
        ]),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {provide: AuthService, useClass: AuthServiceStubLoggedIn},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    Helper.simulateLoggedInUserWithRole('User');
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should redirect to home when logged in`, () => {
    const router: Router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LoginComponent);
    const navSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
    expect(navSpy).toHaveBeenCalledTimes(0);
  });
});


class AuthServiceStub {
  private user: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);

  constructor() {
    this.user.next(JSON.parse(localStorage.getItem('user')));
  }

  logout(): void {
    this.user.next(null);
  }

  get currentUserValue(): UserModel {
    return this.user.value;
  }

  authenticate(request: AuthenticationRequest): Observable<LoginResponse> {
    if (request.email === 'goodEmail' && request.password === 'goodPassword') {
      return of({
        refreshToken: 'reT',
        token: 'tok',
        roles: []
      });
    }
    return throwError(new Error());
  }
}

class AuthServiceStubLoggedIn {
  private user: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>({
    email: 'test@test',
    token: 'token',
    roles: []
  });

  get currentUserValue(): UserModel {
    return this.user.value;
  }
}

class Helper {
  static simulateLoggedInUserWithRole(role: string): void {
    localStorage.setItem('user', JSON.stringify({
      name: 'test',
      email: 'test@test',
      token: 'token',
      roles: [role]
    }));
  }

  static clear(): void {
    localStorage.removeItem('user');
  }
}

@Component({template: ''})
class DummyComponent {
}
