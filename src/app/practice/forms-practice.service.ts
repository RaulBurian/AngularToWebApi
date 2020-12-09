import {Injectable} from '@angular/core';
import {FormsUserModel} from './models/FormsUserModel';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormsPracticeService {

  private error: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private errorObservable: Observable<string> = this.error.asObservable();

  constructor() {
  }

  add(user: FormsUserModel): Observable<boolean> {
    console.log(user);
    return new Observable<boolean>(sub => {
      sub.error(new Error('Test Error!'));
      return sub.next(true);
    }).pipe(catchError(err => {
      this.error.next(err.message);
      return of(err);
    }));
  }

  getErrorObservable(): Observable<string> {
    return this.errorObservable;
  }
}
