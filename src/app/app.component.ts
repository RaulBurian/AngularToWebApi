import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'unghiular';
  loggedIn = false;
  admin = false;
  loginForm: FormGroup;
  returnUrl: string | undefined;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
    if (this.authService.currentUserValue) {
      this.loggedIn=true;
      this.router.navigate(['/list']);
    }

    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/list';
  }

  login(): void {
    this.authService.authenticate(this.loginForm.value)
      .pipe(first())
      .subscribe(success => {
          this.loggedIn = true;
          this.router.navigate([this.returnUrl]);
        },
        error => {
          alert(error);
        });
  }
}
