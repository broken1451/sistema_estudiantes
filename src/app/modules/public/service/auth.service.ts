import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, take } from 'rxjs';
import { LoginRequest, LoginResponse, OptLogin } from '../interfaces/login.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  public optionsToLogin: OptLogin[] =  [
    {
      title: 'Correo', value: 'email'
    },
    {
      title: 'Usuario', value: 'username'
    },
    {
      title: 'Identificacion', value: 'nro_identity'
    },
  ]

  private httpClient = inject(HttpClient);

  constructor() {}

  login(body: LoginRequest): Promise<LoginResponse> {
    console.log(body);
    delete body.remember
     return new Promise((resolve,reject) => {

        return this.httpClient.post<LoginResponse>(`${environment.baseUrl}/auth/login`, body).pipe(take(1)).subscribe({
          next: (res) =>{
            resolve(res)
          },
          error: (err) =>{
            reject(err)
          },
          complete: () =>{
            console.info('Success login.') 
          }
        })
     });
  }
}
