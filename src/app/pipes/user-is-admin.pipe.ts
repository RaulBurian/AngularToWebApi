import {Pipe, PipeTransform} from '@angular/core';
import {UserModel} from '../shared/models/user.model';
import {ADMIN_ROLE} from '../shared/constants/user.constants';

@Pipe({
  name: 'userIsAdmin'
})
export class UserIsAdminPipe implements PipeTransform {

  transform(user: UserModel | null): boolean {
    if (user) {
      return !!user.roles.find(role => role == ADMIN_ROLE);
    }
    return false;
  }
}
