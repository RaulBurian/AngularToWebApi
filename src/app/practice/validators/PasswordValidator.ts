import {AbstractControl} from '@angular/forms';

export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password: AbstractControl | null = control.get('password');
  const confirmPassword: AbstractControl | null = control.get('confirmPassword');
  if (password?.pristine || confirmPassword?.pristine) {
    return null;
  }
  return password && confirmPassword && password.value !== confirmPassword.value ? {noMatch: true} : null;
}
