import { Pipe, PipeTransform } from '@angular/core';
import {UserModel} from '../shared/models/user.model';

@Pipe({
  name: 'userExists'
})
export class UserExistsPipe implements PipeTransform {

  transform(value: UserModel | null): boolean {
    return value!=null;
  }

}
