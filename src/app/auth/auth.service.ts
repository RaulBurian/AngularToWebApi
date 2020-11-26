import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AuthenticationRequest} from './models/AuthenticationRequest';
import {AuthenticationResponse} from './models/AuthenticationResponse';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../shared/models/User';
import {map} from 'rxjs/operators';

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

  authenticate(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(`${this.baseHttp}/login`, request)
      .pipe(map(response => {
        let userToStore: User = {
          email: request.email,
          token: response.token
        };
        localStorage.setItem('user', JSON.stringify(userToStore));
        this.currentUserSubject.next(userToStore);
        return response;
      }));
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

}
