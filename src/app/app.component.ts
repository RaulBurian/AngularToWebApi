import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {

  title = 'unghiular';
  loggedIn = false;
  admin = false;
  userSubscription: Subscription;

  constructor(private authService: AuthService,private router:Router) {
    this.userSubscription=this.authService.currentUserObservable.subscribe(user=>{
      this.loggedIn = !!user;
    });
  }

  ngOnInit(): void {
  }


 ngOnDestroy(): void {
  this.userSubscription.unsubscribe();
}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
