import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AuthenticationRequest} from './contracts/requests/AuthenticationRequest';
import {AuthenticationResponse} from './contracts/responses/AuthenticationResponse';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../shared/models/User';
import {map} from 'rxjs/operators';
import {RegistrationRequest} from './contracts/requests/RegistrationRequest';
import {RegistrationResponse} from './contracts/responses/RegistrationResponse';
import {LoginRequest} from './contracts/requests/LoginRequest';
import {LoginResponse} from './contracts/responses/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseHttp = 'https://localhost:5001/api/v1/identity';
  private currentUserSubject: BehaviorSubject<User | null>;
  private currentUser: Observable<User | null>;

  constructor(private httpClient: HttpClient) {
    const storedUser: string | null = localStorage.getItem('user');
    let storedUserJson: User | null;
    if (storedUser) {
      storedUserJson = JSON.parse(storedUser);
    } else {
      storedUserJson = null;
    }
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUserJson);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public authenticate(request: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.baseHttp}/login`, request)
      .pipe(map(response => {
        this.storeUserInLocalStorage(request, response);
        return response;
      }));
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  public register(request: RegistrationRequest): Observable<RegistrationResponse>{
    return this.httpClient.post<RegistrationResponse>(`${this.baseHttp}/register`,request)
      .pipe(map(response=>{
        this.storeUserInLocalStorage(request,response);
        return response;
      }));
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get currentUserObservable(): Observable<User | null>{
    return this.currentUser;
  }

  private storeUserInLocalStorage(request: AuthenticationRequest, response: AuthenticationResponse) {
    let userToStore: User = {
      email: request.email,
      token: response.token
    };
    localStorage.setItem('user', JSON.stringify(userToStore));
    this.currentUserSubject.next(userToStore);
  }

}
