import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable()
export class ServiceInterceptor implements HttpInterceptor {

   constructor (private router: Router) {}

  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = request.headers;
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Methods', 'POST,GET,DELETE,PATCH');
    headers = headers.append('Access-Control-Allow-Headers', 'Origin,X-Authorization-Type,X-System-Type');
    if (request.method === 'OPTIONS') {
      return next.handle(request).pipe(
        map((event: any) => {
          return event;
        }),
        catchError((error: any) => {
          return throwError(error);
        })
      );
    }

    console.log(`Intercept service: ${request?.url}, method: ${request?.method}`);

    request = request?.clone({
      headers
    });

    if (request?.url?.includes('/api/login') && request?.method === 'GET') {
      return next.handle(request).pipe(
        map(event => {
          return event;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
    }
    

    // headers = headers?.append('Authorization', `Bearer ${this.globalService?.token}`);
    request = request?.clone({
      headers
    });

    return next?.handle(request).pipe(
      map(event => {
        return event;
      }),
      catchError(error => {
        console.log({ error });
        if (error?.status === 401 || error?.status === 403) {
        //   this.globalService.token = '';
          sessionStorage?.clear();
          this.router.navigate(['/login']).then();
        }
        return throwError(error);
      })
    );
  }

}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ServiceInterceptor, multi: true }]
})
export class ServiceInterceptorsModule { }
