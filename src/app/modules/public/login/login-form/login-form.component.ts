import { Component, OnInit, inject, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { LoginResponse, OptLogin } from '../../interfaces/login.interface';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, AfterViewChecked {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  public isCorreo: boolean = true;
  public isUser: boolean = false;
  public isIdentification: boolean = false;
  public optionsToLogin: OptLogin[] = this.authService.optionsToLogin;

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {}

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {}

  async recibeValueFormEmail($event: any) {
    const resp = await this.authService
      .login($event)
      .then(async () => {
        await Swal.fire({
          title: 'Espere por favor...',
          timer: 2000,
          didOpen: () => {
            console.log('here');
            Swal.showLoading();
          },
        }).then((result) => {
          console.log({ result });
          if (result.dismiss === Swal.DismissReason.timer) {
            this.router.navigate(['/private/home']);
          }
        });
      })
      .catch(async (err) => {
        console.log({ err });
        await Swal.fire({
          position: 'center',
          title: 'Espere por favor...',
          timer: 2000,
          didOpen: () => {
            console.log('here');
            Swal.showLoading();
          },
          showCancelButton: false,
          allowOutsideClick: false,
        }).then(async (result) => {
          console.log(result);
          if (result.dismiss === Swal.DismissReason.timer) {
            await Swal.fire({
              position: 'center',
              icon: 'error',
              title: err?.error?.message,
              showConfirmButton: false,
              timer: 2000,
              showCancelButton: false,
              allowOutsideClick: false,
            })
          }
        });
      });
  }

  async recibeformUserValue($event: any) {
    console.log($event);
    const resp = await this.authService.login($event).catch((err) => {
      console.log({ err });
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: err?.error?.message,
        showConfirmButton: false,
        timer: 2000,
        showCancelButton: false,
        allowOutsideClick: false,
      });
    });
    await Swal.fire({
      title: 'Espere por favor...',
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this.router.navigate(['/private/home']);
      }
    });
  }

  async recibeformIdentityValue($event: any) {
    $event.nro_identity = $event.nro_identity.replaceAll('.', '');
    const resp = await this.authService.login($event).catch((err) => {
      console.log({ err });
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: err?.error?.message,
        showConfirmButton: false,
        timer: 2000,
        showCancelButton: false,
        allowOutsideClick: false,
      });
    });
    await Swal.fire({
      title: 'Espere por favor...',
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this.router.navigate(['/private/home']);
      }
    });
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
}
