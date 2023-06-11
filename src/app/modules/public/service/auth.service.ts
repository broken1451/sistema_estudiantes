import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, take } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  OptLogin,
} from '../interfaces/login.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { RegisterUser } from '../interfaces/register.user..interface';
import { ResponseUsers, User } from '../interfaces/user.interfaces';

@Injectable()
export class AuthService {
  public optionsToLogin: OptLogin[] = [
    {
      title: 'Correo',
      value: 'email',
    },
    {
      title: 'Usuario',
      value: 'username',
    },
    {
      title: 'Identificacion',
      value: 'nro_identity',
    },
  ];

  private httpClient = inject(HttpClient);
  private router = inject(Router);

  public email!: string;
  public nro_identity!: string;
  public username!: string;
  public token!: string;
  public usuario!: User | any;
  public menu: any;

  constructor() {
    this.cargarStorageCredentials();
    this.cargarStorage();
    this.cargarStorageUser();
  }

  login(body: LoginRequest): Promise<LoginResponse> {
    this.saveStorageCredentials(body.remember, body);
    delete body.remember;
    return new Promise((resolve, reject) => {
      return this.httpClient
        .post<LoginResponse>(`${environment.baseUrl}/auth/login`, body)
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            this.saveStorage(res.token!)
            this.guardarStorageUser(res.user?._id!, res.token!,res?.user!, res?.menu)
            resolve(res);
          },
          error: (err) => {
            reject(err);
          },
          complete: () => {
            console.info('Success login.');
          },
        });
    });
  }

  saveStorageCredentials(remember?: boolean, body?: LoginRequest) {
    // console.log(remember, body);
    if (remember) {
      if (body?.email!) {
        localStorage.setItem('email', body?.email!);
      } else if (body?.nro_identity!) {
        localStorage.setItem('nro_identity', body?.nro_identity!);
      } else {
        localStorage.setItem('username', body?.username!);
      }
    } else {
      console.log(remember, body?.nro_identity != '');
      if (body?.nro_identity != '' && !remember) {
        localStorage.removeItem('nro_identity');
      }
      if (body?.username != '' && !remember) {
        localStorage.removeItem('username');
      }
      if (body?.email != '' && !remember) {
        localStorage.removeItem('email');
      }
    }
  }

  cargarStorageCredentials() {
    if (localStorage.getItem('email')) {
      this.email = localStorage.getItem('email')!;
    } else if (localStorage.getItem('nro_identity')) {
      this.nro_identity = localStorage.getItem('nro_identity')!;
    } else if (localStorage.getItem('username')) {
      this.username = localStorage.getItem('username')!;
    } else {
      this.email = '';
      this.nro_identity = '';
      this.username = '';
    }
  }

  public goToRegister() {
    this.router.navigate(['/register']);
  }

  public goToLogin() {
    this.router.navigate(['/login']);
  }

  register(body: RegisterUser): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      return this.httpClient
        .post<any>(`${environment.baseUrl}/auth`, body)
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err) => {
            reject(err);
          },
          complete: () => {
            console.info('Success login.');
          },
        });
    });
  }

  saveStorage(token: string) {
    sessionStorage.setItem('token', token);
  }

  isLogged() {
    if (sessionStorage.getItem('token')) {
      console.log('Paso por el login guard de la funcion estaLogueado');
      return true;
    } else {
      console.log('Debe estar logueado');
      return false;
    }
  }

  cargarStorage() {
    if (localStorage.getItem('token') || localStorage.getItem('usuario')) {
      // this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.token = sessionStorage.getItem('token')!;
      // this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';;
    }
  }


  getUsers(desde: number = 0): Promise<ResponseUsers>{
    return new Promise((resolve, reject) => {
      return this.httpClient
        .get<ResponseUsers>(`${environment.baseUrl}/auth?desde=${desde}`)
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err) => {
            reject(err);
          },
          complete: () => {
            console.info('Users success.');
          },
        });
    });
  }


  guardarStorageUser(id: string, token: string, usuario: User, menu: any ) {
    localStorage.setItem('id', id);
    // localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.menu = menu;
  }

  cargarStorageUser() {
    if (sessionStorage.getItem('token') || localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario')!);
      this.menu = JSON.parse(localStorage.getItem('menu')!);
    } else {
      this.usuario = null;
      this.menu = [];
    }
  }
}
