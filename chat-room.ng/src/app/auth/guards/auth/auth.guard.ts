import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { User, UserService } from '../../../api';
import { SessionKeys, StateService } from '../../../core/services/state/state.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService, private stateService: StateService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.getUserLogged().pipe(
      catchError(error => {
        this.stateService.clear();
        this.router.navigate(['/login']);
        return throwError(error);
      }),
      map(u => {
        this.stateService.set(SessionKeys.User, u);
        return true;
      })
    );
  }
}
