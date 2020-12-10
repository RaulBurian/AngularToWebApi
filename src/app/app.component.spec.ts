import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './auth/auth.service';
import {By} from '@angular/platform-browser';
import {BehaviorSubject} from 'rxjs';
import {UserModel} from './shared/models/user.model';
import {SessionError} from './shared/errors/session-error';
import {Component, DebugElement} from '@angular/core';
import {UserIsAdminPipe} from './pipes/user-is-admin.pipe';
import {Location} from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'home', component: DummyComponent},
          {path: 'login', component: DummyComponent}
        ]),
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        UserIsAdminPipe
      ],
      providers: [
        {provide: AuthService, useClass: AuthServiceStub},
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'unghiular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('unghiular');
  });

  it(`should have a navbar button`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const button: HTMLHeadElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button !== null).toBeTruthy();
  });

  it(`should show logout button when user is logged in`, () => {
    Helper.simulateLoggedInUserWithRole('User');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const buttons: DebugElement[] = fixture.debugElement.queryAll(By.css('.nav-link'));
    expect(buttons.filter(btn => btn.nativeElement.innerText === 'Logout').length === 1).toBeTruthy();
  });

  it(`should show tags section when the user is logged in as admin`, () => {
    Helper.simulateLoggedInUserWithRole('Admin');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const headers: DebugElement[] = fixture.debugElement.queryAll(By.css('.list-header'));
    expect(headers.filter(header => header.nativeElement.innerText === 'Tags Section:')).toBeTruthy();
  });

  it(`should redirect to login when we click logout`, async () => {
    Helper.simulateLoggedInUserWithRole('User');
    const fixture = TestBed.createComponent(AppComponent);
    const location = TestBed.inject(Location);
    fixture.detectChanges();
    const logOutButton: HTMLHeadElement = fixture.debugElement.queryAll(By.css('.nav-link'))[0].nativeElement;
    logOutButton.click();
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      expect(location.path()).toBe('/login');
    });
  });
});

class AuthServiceStub {
  private user: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
  currentUserToObserve = this.user.asObservable();
  private error: BehaviorSubject<SessionError> = new BehaviorSubject<SessionError>(null);
  private sessionError = this.error.asObservable();

  constructor() {
    this.user.next(JSON.parse(localStorage.getItem('user')));
  }

  logout(): void {
    this.user.next(null);
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
}

@Component({template: ''})
class DummyComponent {
}
