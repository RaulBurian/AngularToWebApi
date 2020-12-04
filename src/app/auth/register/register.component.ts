import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  returnUrl: string = '/home';

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
    if (this.authService.currentUserValue) {
      this.router.navigate([this.returnUrl]);
    }
    this.registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  register(): void {
    this.authService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(success => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          // console.log(error.error.errors);
          let errors: string = '';
          error.error.errors.forEach((err: { message: any; }) => {
            return errors += `${err.message}\n`;
          });
          alert(errors);
        });
  }

}
