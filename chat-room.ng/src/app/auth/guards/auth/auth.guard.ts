import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User, UserService } from '../../../api';
import { SessionKeys, StateService } from '../../../core/services/state/state.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService, private stateService: StateService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const username = this.stateService.get<string>(SessionKeys.Username);
    if (username) {
      return this.userService.getUserByName(username).pipe(
        map(u => {
          this.stateService.set(SessionKeys.User, u);
          return true;
        })
      );
    }
    this.stateService.clear();
    this.router.navigate(['/login']);
    return false;
  }
}
