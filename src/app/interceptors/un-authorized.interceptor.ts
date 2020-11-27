import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class UnAuthorizedInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.authService.logout();
        this.authService.sessionError=err;
        this.router.navigate(['/login'], {queryParams: {returnUrl: document.location.pathname}});
      }
      return throwError(err);
    }));
  }
}
