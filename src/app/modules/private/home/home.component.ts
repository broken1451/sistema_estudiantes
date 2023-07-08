import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { AuthService } from '../../public/service/auth.service';
import { User } from '../../public/interfaces/user.interfaces';
import * as moment from 'moment';
import 'moment/locale/es';
import { OptLogin } from '../../public/interfaces/login.interface';
import { RegisterUser } from '../../public/interfaces/register.user..interface';
import Swal from 'sweetalert2';
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
  public isCorreo: boolean = true;
  public isUser: boolean = false;
  public isIdentification: boolean = false;
  private readonly userService = inject(AuthService);
  private userLogged!: User;
  public optionsToLogin: OptLogin[] = this.userService.optionsToLogin;
  public userSend!: User;

  constructor() {
    this.userLogged = JSON.parse(localStorage.getItem('usuario')!)
  }

  ngOnInit(): void {
    this.getUser(String(this.desde));
    this.user = JSON.parse(localStorage.getItem('usuario')!);
  }

  async getUser(desde?: string) {
    const resp = await this.userService.getUsers(Number(desde)).catch(err => { });
    this.usersBack = resp?.users!;
    this.usersBack.forEach(element => {
      const m = moment(element.created);
      element.created = m.fromNow();
    });
    this.auxUsersBack = Object.assign([], this.usersBack);


  }


  prev() {
    if (this.desde > 0) {
      this.desde = this.desde - 1;
      this.getUser(String(this.desde))
    }
    if (this.desde <= 0) {
      this.desde = 0;
      this.getUser(String(this.desde))
      return;
    }

  }

  next() {
    this.desde = this.desde + 1;
    this.getUser(String(this.desde));
    console.log(this.desde);
    console.log(this.usersBack);
  }

  delete(user: User) {
    console.log(user);
    console.log(this.userLogged );
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    })
    
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Borrara el usurio ' + user.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then( async(result) => {
      if (result.isConfirmed) {
        if (user._id === this.userLogged._id) {
          Swal.fire('No puede Eliminar usuario', 'No se puede eliminar el usuario logueado o a si mismo', 'error');
          return;
        }
        await Swal.fire({
          title: 'Espere por favor...',
          timer: 2000,
          didOpen: () => {
            Swal.showLoading();
          }
        }).then( async (result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            await this.userService.deleteUser(user._id).catch(err =>{console.log(err)});
            this.getUser(String(this.desde));
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'El Usuario ' + user.name + ' esta a salvo :)', 'info');
      }
    })
  }

  updated(user: User){
    this.userSend = user;
    this.userService.userToUpdate = user;
    console.log(this.userSend);
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
    const resp = await this.userService.register($event).catch(err => {

    });
    await Swal.fire({
      title: 'Espere por favor...',
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this.getUser(String(this.desde));
      }
    });
  }
  
}
