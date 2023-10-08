import { AfterViewInit, Component, DoCheck, ElementRef, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { AuthService } from '../../public/service/auth.service';
import { User } from '../../public/interfaces/user.interfaces';
import * as moment from 'moment';
import 'moment/locale/es';
import { OptLogin } from '../../public/interfaces/login.interface';
import { RegisterUser, UpdatedUser } from '../../public/interfaces/register.user..interface';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
moment.locale('es');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public desde: number = 0;
  public usersBack!: User[];
  public auxUsersBack: User[] = [];
  public user!: User;
  public isCorreo: boolean = false;
  public isUser: boolean = false;
  public isIdentification: boolean = false;
  private readonly userService = inject(AuthService);
  private userLogged!: User;
  public optionsToLogin: OptLogin[] = this.userService.optionsToLogin;
  public optionsToLoginDefault: OptLogin[] = this.userService.optionsToLogin;
  public userSend!: User;
  public termino: string = '';
  public selectedUser = null;
  public userDetail!: User;
  public user$: Subscription;

  constructor() {
    this.userLogged = JSON.parse(localStorage.getItem('usuario')!);
  }

  async buscar(termino: string) {
    if (termino.length == 0) {
      this.termino = '';
      this.getUser(String(this.desde));
      return
    }
    this.termino = termino;
    const res = await this.userService.getUsersByTerm(this.termino).then((res) => {
      this.usersBack = res?.users!;
      this.usersBack.forEach((element) => {
        const m = moment(element.created);
        const mup = moment(element.updated);
        element.created = m.fromNow();
        element.updated = mup.fromNow();
      });
      this.auxUsersBack = Object.assign([], this.usersBack);
    }).catch((err)=> { });
  }

  ngOnInit(): void {
    this.getUser(String(this.desde));
    this.user = JSON.parse(localStorage.getItem('userLoged')!);
  }

  async getUser(desde?: string): Promise<any> {
    const resp = await this.userService
      .getUsers(Number(desde)).then((res)=> {
        this.usersBack = res?.users!;
        this.usersBack.forEach((element) => {
          const m = moment(element.created);
          const mup = moment(element.updated)
          element.created = m.fromNow();
          element.updated = mup.fromNow();
        });
        const userloged = JSON.parse(localStorage.getItem('userLoged')!)
        // console.log({userloged});
        this.auxUsersBack = Object.assign([], this.usersBack);
        // console.log({auxUsersBack: this.auxUsersBack});
        this.auxUsersBack.forEach((user)=> {
          if (user._id == userloged._id) {
            localStorage.setItem('userLoged', JSON.stringify(user));
          }
        })
      })
      .catch((err) => {
        console.log({err});
      });
    return resp;
  }

  prev() {
    if (this.desde > 0) {
      this.desde = this.desde - 1;
      this.getUser(String(this.desde));
    }
    if (this.desde <= 0) {
      this.desde = 0;
      this.getUser(String(this.desde));
      return;
    }
  }

  next() {
    this.desde = this.desde + 1;
    this.getUser(String(this.desde));
  }

  delete(user: User) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Borrara el usurio ' + user.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (user._id === this.userLogged._id) {
          Swal.fire(
            'No puede Eliminar usuario',
            'No se puede eliminar el usuario logueado o a si mismo',
            'error'
          );
          return;
        }
        await Swal.fire({
          title: 'Espere por favor...',
          timer: 2000,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(async (result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            await this.userService.deleteUser(user._id).then(()=>{
              this.getUser(String(this.desde));
            }).catch((err) => {
              console.log({err});
            });
            
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'El Usuario ' + user.name + ' esta a salvo :)',
          'info'
        );
      }
    });
  }


  detail(user: User){
    this.userDetail = user;
  }

  updated(user: User) {
    this.userSend = user;
    this.userService.userToUpdate = user;
    // console.log(this.userSend);
  }

  selectChamge($event: any) {
    if ($event.target.value == 'username') {
      this.isCorreo = false;
      this.isUser = true;
      this.isIdentification = false;
    }

    if ($event.target.value == 'email') {
      this.isCorreo = true;
      this.isUser = false;
      this.isIdentification = false;
    }

    if ($event.target.value == 'nro_identity') {
      this.isCorreo = false;
      this.isUser = false;
      this.isIdentification = true;
    }
  }

  async recibeValueForm($event: RegisterUser) {
    const resp = await this.userService.register($event).catch((err) => {});
    await Swal.fire({
      title: 'Espere por favor...',
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this.getUser(String(this.desde));
      }
    });
  }

  async recibeUpdate(event: any) {
    console.log({ event });
    const resp = await this.userService
      .updated(event, event.id)
      .then(async (res) => {
        await Swal.fire({
          title: 'Espere por favor...',
          timer: 2000,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(async (result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            this.getUser(String(this.desde));
            // const userloged = JSON.parse(localStorage.getItem('userLoged')!)
            // console.log({userloged});
            // this.usersBack.forEach((user) => {
            //   console.log({user});
              // if (user._id) {
              // }
            // })
          }
        });
      })
      .catch((err) => {});
  }

  setDefault($event: boolean) {
    this.selectedUser = null
    this.isCorreo = false;
    this.isUser = false;
    this.isIdentification = false;
  }
}
