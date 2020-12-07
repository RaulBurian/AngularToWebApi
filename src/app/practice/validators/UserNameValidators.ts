import {AbstractControl, ValidatorFn} from '@angular/forms';

// we can only pass the control to a custom validator function
// export function forbiddenNameValidator(control: AbstractControl): { [key: string]: any } | null {
//   const forbidden: boolean = new RegExp('admin').test(control.value);
//   return forbidden ? {forbiddenName: control.value} : null;
// }

export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: string } | null => {
    const forbidden: boolean = forbiddenName.test(control.value);
    return forbidden ? {forbiddenName: control.value} : null;
  };
}
