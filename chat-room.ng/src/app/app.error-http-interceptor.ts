import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StateService } from './core/services/state/state.service';

@Injectable()
export class AppErrorHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router, private stateService: StateService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.stateService.clear();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
