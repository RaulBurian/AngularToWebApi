import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {forbiddenNameValidator} from '../validators/UserNameValidators';
import {PasswordValidator} from '../validators/PasswordValidator';

@Component({
  selector: 'app-reactive-forms-practice',
  templateUrl: './reactive-forms-practice.component.html',
  styleUrls: ['./reactive-forms-practice.component.css']
})
export class ReactiveFormsPracticeComponent implements OnInit {

  // we can create the form group manually
  // registrationForm: FormGroup = new FormGroup({
  //   username: new FormControl(),
  //   password: new FormControl(),
  //   confirmPassword: new FormControl(),
  //   address: new FormGroup({
  //     city: new FormControl(),
  //     state: new FormControl(),
  //     postalCode: new FormControl()
  //   })
  // });

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    // or we can create them using the form builder
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required,
        Validators.minLength(3),
        forbiddenNameValidator(/pwd/)]],
      password: [''],
      email: [''],
      offers: [false],
      confirmPassword: [''],
      address: this.formBuilder.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.formBuilder.array([])
    }, {validator: PasswordValidator});
  }

  ngOnInit(): void {
    this.registrationForm.get('offers')?.valueChanges.subscribe(checkedValue => {
      const email: AbstractControl | null = this.getEmail();
      if (checkedValue) {
        email?.setValidators(Validators.required);
      } else {
        email?.clearValidators();
      }
      email?.updateValueAndValidity();
    });
  }

  getUsername(): AbstractControl | null {
    return this.registrationForm.get('username');
  }

  getEmail(): AbstractControl | null {
    return this.registrationForm.get('email');
  }

  getAlternateEmails(): FormArray {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail(): void {
    this.getAlternateEmails().push(this.formBuilder.control(''));
  }

  populate(): void {

    // set value needs perfect matching with all fields
    // this.registrationForm.setValue({
    //   username: 'raul',
    //   password: 'test',
    //   email: 'raul@raul',
    //   confirmPassword: 'test',
    //   address: {
    //     city: 'Cluj Napoca',
    //     state: 'Cluj',
    //     postalCode: '123456'
    //   },
    //   offers: true
    // });

    // patch value fills what it matches
    this.registrationForm.patchValue({
      username: 'raul',
      password: 'test',
      email: 'raul@raul',
      confirmPassword: 'test',
      address: {
        city: 'Cluj Napoca',
        state: 'Cluj',
        postalCode: '123456'
      },
      offers: true
    });
  }

  onSubmit(): void {
    console.log(this.registrationForm.value);
  }
}
