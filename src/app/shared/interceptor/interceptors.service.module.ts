import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Injectable()
export class ServiceInterceptor implements HttpInterceptor {

   constructor (private router: Router) {}

  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> | any {

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
        catchError(err => {
          return throwError(() => err);
        })
      );
    }
    

    headers = headers?.append('Authorization', `Bearer ${sessionStorage.getItem('token')!}`);
    request = request?.clone({
      headers
    });

    return next?.handle(request).pipe(
      map(event => {
        return event;
      }),
      catchError( async  error => {
        if (error?.status === 403) {
          await Swal.fire({
            title: 'El usuario logueado no esta autorizado.',
            timer: 2000,
            icon: 'error',
            showConfirmButton: false
          });
        }

        if (error?.status === 401) {
          sessionStorage?.clear();
          localStorage?.removeItem('id');
          localStorage?.removeItem('usuario');
          localStorage?.removeItem('menu');
          localStorage?.removeItem('userLoged');
          this.router.navigate(['/login']).then();
        }
        return throwError(() => error);
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
