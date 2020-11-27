import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AuthenticationRequest} from './contracts/requests/AuthenticationRequest';
import {AuthenticationResponse} from './contracts/responses/AuthenticationResponse';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../shared/models/user.model';
import {map} from 'rxjs/operators';
import {RegistrationRequest} from './contracts/requests/RegistrationRequest';
import {RegistrationResponse} from './contracts/responses/RegistrationResponse';
import {LoginRequest} from './contracts/requests/LoginRequest';
import {LoginResponse} from './contracts/responses/LoginResponse';
import {Routes} from '../shared/routes/routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<UserModel | null>;
  private currentUserObservable: Observable<UserModel | null>;
  private errorSubject: BehaviorSubject<Error | null>;
  private errorObservable: Observable<Error | null>;

  constructor(private httpClient: HttpClient) {
    const storedUser: string | null = localStorage.getItem('user');
    let storedUserJson: UserModel | null;
    if (storedUser) {
      storedUserJson = JSON.parse(storedUser);
    } else {
      storedUserJson = null;
    }
    this.currentUserSubject = new BehaviorSubject<UserModel | null>(storedUserJson);
    this.currentUserObservable = this.currentUserSubject.asObservable();
    this.errorSubject = new BehaviorSubject<Error | null>(null);
    this.errorObservable = this.errorSubject.asObservable();
  }

  authenticate(request: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(Routes.Auth.LOGIN, request)
      .pipe(map(response => {
        this.storeUserInLocalStorage(request, response);
        return response;
      }));
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  register(request: RegistrationRequest): Observable<RegistrationResponse> {
    return this.httpClient.post<RegistrationResponse>(Routes.Auth.REGISTER, request)
      .pipe(map(response => {
        this.storeUserInLocalStorage(request, response);
        return response;
      }));
  }

  get currentUserValue(): UserModel | null {
    return this.currentUserSubject.value;
  }

  get currentUserToObserve(): Observable<UserModel | null> {
    return this.currentUserObservable;
  }

  set sessionError(error: Error | null){
    this.errorSubject.next(error);
  }

  get sessionErrorToObserve(): Observable<Error | null> {
    return this.errorObservable;
  }

  private storeUserInLocalStorage(request: AuthenticationRequest, response: AuthenticationResponse) {
    let userToStore: UserModel = {
      email: request.email,
      token: response.token
    };
    localStorage.setItem('user', JSON.stringify(userToStore));
    this.currentUserSubject.next(userToStore);
  }

}
