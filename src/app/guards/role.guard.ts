import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageService} from '../shared/services/storage.service';
import {ADMIN_ROLE, USER_KEY} from '../shared/constants/user.constants';
import {UserModel} from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private storageService: StorageService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user: UserModel = JSON.parse(this.storageService.getItem(USER_KEY) || '{}');
    let result: boolean = false;
    if (user.roles) {
      result = !!user.roles.find(role => role === ADMIN_ROLE);
    }
    if (result) {
      return result;
    }
    this.router.navigate(['/home']);
    return result;
  }
}
