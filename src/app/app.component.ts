import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {

  title = 'unghiular';
  admin = false;
  user$: Observable<UserModel| null>;
  sessionError$: Observable<Error | null>;

  constructor(private authService: AuthService,private router:Router) {
    this.user$=this.authService.currentUserToObserve;
    this.sessionError$=this.authService.sessionErrorToObserve;
  }

  ngOnInit(): void {
  }


 ngOnDestroy(): void {
}

  logout() {
    this.clearSessionError();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  clearSessionError() {
    this.authService.sessionError=null;
  }
}
