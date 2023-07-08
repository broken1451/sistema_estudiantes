import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, take } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  Menu,
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
  public menu: any[]  = [];
  public userToUpdate!: User;

  constructor() {
    this.cargarStorage();
    this.cargarStorageCredentials();
    // this.cargarStorageUser();
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
            // this.saveStorage(res.token)
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
    if (remember) {
      if (body?.email!) {
        localStorage.setItem('email', body?.email!);
      } else if (body?.nro_identity!) {
        localStorage.setItem('nro_identity', body?.nro_identity!);
      } else {
        localStorage.setItem('username', body?.username!);
      }
    } else {
      if (body?.nro_identity != '' && !remember) {
        if (body?.email != '') {
          this.nro_identity = localStorage.getItem('nro_identity')!;
        } else {
          localStorage.removeItem('nro_identity');
        }
      }
      if (body?.username != '' && !remember) {
        if (body?.email != '') {
          this.username = localStorage.getItem('username')!;
        } else {
          localStorage.removeItem('username');
        }
      }
      if (body?.email != '' && !remember) {
        if (body?.email != '') {
          this.email = localStorage.getItem('email')!;
        } else {
          localStorage.removeItem('email');
        }
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
            console.info('Success create.');
          },
        });
    });
  }

  deleteUser(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const params: HttpParams = new HttpParams().set('id',id );
      return this.httpClient
        .delete<any>(`${environment.baseUrl}/auth/${id}`)
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err) => {
            reject(err);
          },
          complete: () => {
            console.info('Success create.');
          },
        });
    });
  }

  saveStorage(token?: string) {
    sessionStorage.setItem('token', token!);
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
    if (sessionStorage.getItem('token')) {
      console.log('hete');
      this.usuario = JSON.parse(localStorage.getItem('usuario')!);
      this.menu = JSON.parse(localStorage.getItem('menu')!);
    } else {
      this.usuario = null;
      this.menu = [];
      this.token = '';
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
    sessionStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    localStorage.setItem('userLoged', JSON.stringify(usuario));
    this.usuario = usuario;
    this.menu = menu;
    // console.log({menuService: this.menu});
  }

  // cargarStorageUser() {
  //   if (sessionStorage.getItem('token')) {
  //     console.log('hete');
  //     this.usuario = JSON.parse(localStorage.getItem('usuario')!);
  //     this.menu = JSON.parse(localStorage.getItem('menu')!);
  //   } else {
  //     this.usuario = null;
  //     this.menu = [];
  //   }
  // }

  logout() {
    // this.usuario = null;
    this.token = '';
    // this.menu = [];
    sessionStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    localStorage.removeItem('userLoged');
    // sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  cargarMenu() {
    this.menu = this.menu;
  }
}
