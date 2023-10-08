import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControlOptions,
} from '@angular/forms';
import { User } from '../../../public/interfaces/user.interfaces';
import { UpdatedUser } from 'src/app/modules/public/interfaces/register.user..interface';
import { AuthService } from 'src/app/modules/public/service/auth.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-update-by-email',
  templateUrl: './update-by-email.component.html',
  styleUrls: ['./update-by-email.component.scss'],
})
export class UpdateByEmailComponent implements OnInit, OnChanges {

  @Output() formValueEmail = new EventEmitter<any>();
  @Output() setDefaultEmail = new EventEmitter<boolean>();
  private readonly authService = inject(AuthService);
  private fb = inject(FormBuilder);
  @Input() user!: User;
  public imagenSubirTemp: any;
  public imagenSubir!: File;
  public loading: any;
  public cont: any;

  @ViewChild('customFile', { static: true }) customFile!: ElementRef;

  public formOptions: AbstractControlOptions = {
    validators: [this.sonIguales('password', 'password2')],
  };

  public form!: FormGroup;

  get formsValue() {
    return this.form.controls;
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.authService.userToUpdate?.name, [Validators.required]],
      email: [this.authService.userToUpdate?.email, [Validators.pattern(/^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-zA-Z]{2,5})$/)]],
      // img: [this.authService.userToUpdate?.img, []],
      check1: [this.setValueAdm(this.authService.userToUpdate?.roles)],
      check2: [this.setValueDocente(this.authService.userToUpdate?.roles)],
      check3: [this.setValueEstudiante(this.authService.userToUpdate?.roles)],
      check4: [this.setValueParents(this.authService.userToUpdate?.roles)],
    });
  }


  setValueAdm(roles: any): any {
    if (roles?.includes('ADMIN')) {
      return true;
    } else {
      return false;
    }
  }

  setValueDocente(roles: any): any {
    if (roles?.includes('DOCENTE')) {
      return true;
    } else {
      return false;
    }
  }

  setValueEstudiante(roles: any): any {
    if (roles?.includes('ESTUDIANTE')) {
      return true;
    } else {
      return false;
    }
  }

  setValueParents(roles: any): any {
    if (roles?.includes('PARENTS')) {
      return true;
    } else {
      return false;
    }
  }



  ngOnChanges(changes: SimpleChanges): void {
    this.form = this.fb.group(
      {
        name: [changes['user'].currentValue?.name, [Validators.required]],
        email: [changes['user'].currentValue?.email, [Validators.pattern(/^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-zA-Z]{2,5})$/)]],
        // img: [changes['user'].currentValue?.img, []],
        check1: [this.setValueAdm(changes['user'].currentValue?.roles)],
        check2: [this.setValueDocente(changes['user'].currentValue?.roles)],
        check3: [this.setValueEstudiante(changes['user'].currentValue?.roles)],
        check4: [this.setValueParents(changes['user'].currentValue?.roles)],
      }
      // this.formOptions
    );
  }

  campoNoEsValido(campo: string): any {
    return (
      this.form?.controls[campo]?.errors && this.form?.controls[campo]?.touched
    );
  }

  onSubmit() {
    let roles: string[] = [];
    if (
      this.formsValue['check1'].value &&
      this.formsValue['check2'].value &&
      this.formsValue['check3'].value &&
      this.formsValue['check4'].value
    ) {
      this.formsValue['check1'].setValue('ADMIN');
      this.formsValue['check2'].setValue('DOCENTE');
      this.formsValue['check3'].setValue('ESTUDIANTE');
      this.formsValue['check4'].setValue('PARENTS');
      roles.push(
        this.formsValue['check1'].value,
        this.formsValue['check2'].value,
        this.formsValue['check3'].value,
        this.formsValue['check4'].value
      );
    } else if (
      this.formsValue['check1'].value &&
      this.formsValue['check2'].value &&
      this.formsValue['check3'].value &&
      !this.formsValue['check4'].value
    ) {
      this.formsValue['check1'].setValue('ADMIN');
      this.formsValue['check2'].setValue('DOCENTE');
      this.formsValue['check3'].setValue('ESTUDIANTE');
      roles.push(
        this.formsValue['check1'].value,
        this.formsValue['check2'].value,
        this.formsValue['check3'].value
      );
    } else if (
      this.formsValue['check1'].value &&
      this.formsValue['check2'].value &&
      !this.formsValue['check3'].value &&
      !this.formsValue['check4'].value
    ) {
      this.formsValue['check1'].setValue('ADMIN');
      this.formsValue['check2'].setValue('DOCENTE');
      roles.push(
        this.formsValue['check1'].value,
        this.formsValue['check2'].value
      );
    } else if (
      this.formsValue['check1'].value &&
      !this.formsValue['check2'].value &&
      !this.formsValue['check3'].value &&
      !this.formsValue['check4'].value
    ) {
      this.formsValue['check1'].setValue('ADMIN');
      roles.push(this.formsValue['check1'].value);
    } else if (
      this.formsValue['check1'].value &&
      !this.formsValue['check2'].value &&
      this.formsValue['check3'].value &&
      !this.formsValue['check4'].value
    ) {
      this.formsValue['check1'].setValue('ADMIN');
      this.formsValue['check3'].setValue('ESTUDIANTE');
      roles.push(
        this.formsValue['check1'].value,
        this.formsValue['check3'].value
      );
    } else if (
      this.formsValue['check1'].value &&
      !this.formsValue['check2'].value &&
      !this.formsValue['check3'].value &&
      this.formsValue['check4'].value
    ) {
      this.formsValue['check1'].setValue('ADMIN');
      this.formsValue['check4'].setValue('PARENTS');
      roles.push(
        this.formsValue['check1'].value,
        this.formsValue['check4'].value
      );
    } else if (
      this.formsValue['check1'].value &&
      !this.formsValue['check2'].value &&
      this.formsValue['check3'].value &&
      this.formsValue['check4'].value
    ) {
      this.formsValue['check1'].setValue('ADMIN');
      this.formsValue['check3'].setValue('ESTUDIANTE');
      this.formsValue['check4'].setValue('PARENTS');
      roles.push(
        this.formsValue['check1'].value,
        this.formsValue['check3'].value,
        this.formsValue['check4'].value
      );
    } else if (
      this.formsValue['check1'].value &&
      this.formsValue['check2'].value &&
      !this.formsValue['check3'].value &&
      this.formsValue['check4'].value
    ) {
      this.formsValue['check1'].setValue('ADMIN');
      this.formsValue['check2'].setValue('DOCENTE');
      this.formsValue['check4'].setValue('PARENTS');
      roles.push(
        this.formsValue['check1'].value,
        this.formsValue['check2'].value,
        this.formsValue['check4'].value
      );
    } else if (
      !this.formsValue['check1'].value &&
      this.formsValue['check2'].value &&
      this.formsValue['check3'].value &&
      this.formsValue['check4'].value
    ) {
      this.formsValue['check2'].setValue('DOCENTE');
      this.formsValue['check3'].setValue('ESTUDIANTE');
      this.formsValue['check4'].setValue('PARENTS');
      roles.push(
        this.formsValue['check2'].value,
        this.formsValue['check3'].value,
        this.formsValue['check4'].value
      );
    } else if (
      !this.formsValue['check1'].value &&
      this.formsValue['check2'].value &&
      this.formsValue['check3'].value &&
      !this.formsValue['check4'].value
    ) {
      this.formsValue['check2'].setValue('DOCENTE');
      this.formsValue['check3'].setValue('ESTUDIANTE');
      roles.push(
        this.formsValue['check2'].value,
        this.formsValue['check3'].value
      );
    } else if (
      !this.formsValue['check1'].value &&
      this.formsValue['check2'].value &&
      !this.formsValue['check3'].value &&
      this.formsValue['check4'].value
    ) {
      this.formsValue['check2'].setValue('DOCENTE');
      this.formsValue['check4'].setValue('PARENTS');
      roles.push(
        this.formsValue['check2'].value,
        this.formsValue['check4'].value
      );
    } else if (
      !this.formsValue['check1'].value &&
      this.formsValue['check2'].value &&
      !this.formsValue['check3'].value &&
      !this.formsValue['check4'].value
    ) {
      this.formsValue['check2'].setValue('DOCENTE');
      roles.push(this.formsValue['check2'].value);
    } else if (
      !this.formsValue['check1'].value &&
      !this.formsValue['check2'].value &&
      this.formsValue['check3'].value &&
      !this.formsValue['check4'].value
    ) {
      this.formsValue['check3'].setValue('ESTUDIANTE');
      roles.push(this.formsValue['check3'].value);
    } else if (
      !this.formsValue['check1'].value &&
      !this.formsValue['check2'].value &&
      this.formsValue['check3'].value &&
      this.formsValue['check4'].value
    ) {
      this.formsValue['check3'].setValue('ESTUDIANTE');
      this.formsValue['check4'].setValue('PARENTS');
      roles.push(
        this.formsValue['check3'].value,
        this.formsValue['check4'].value
      );
    } else if (
      !this.formsValue['check1'].value &&
      !this.formsValue['check2'].value &&
      !this.formsValue['check3'].value &&
      this.formsValue['check4'].value
    ) {
      this.formsValue['check4'].setValue('PARENTS');
      roles.push(this.formsValue['check4'].value);
    }

    const updatedUser: UpdatedUser = {
      name: this.formsValue['name'].value,
      email: this.formsValue['email'].value,
      // img: this.formsValue['img'].value,
      // password: this.formsValue['password'].value,
      roles,
    };

    // console.log({ updatedUser });

    // this.cambiarImagen()
    $('#updateUser').modal('hide');
    this.formValueEmail.emit({updatedUser, id:this.user._id});
    this.setDefaultEmail.emit(false)
    // this.form.reset();
  }

  sonIguales(campo1: string, campo2: string): any {
    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true,
      };
    };
  }


  cancel(){
    this.form = this.fb.group(
      {
        name: [this.user.name, [Validators.required]],
        email: [this.user?.email, [Validators.pattern(/^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-zA-Z]{2,5})$/)]],
        // img: [this.user?.img, []],
        // check1: [this.isAdmin],
        // check2: [this.isDocente],
        // check3: [this.isEstudiante],
        // check4: [this.isParents],
        check1: [this.setValueAdm(this.user?.roles)],
        check2: [this.setValueDocente(this.user?.roles)],
        check3: [this.setValueEstudiante(this.user?.roles)],
        check4: [this.setValueParents(this.user?.roles)],
      }
      // this.formOptions
    );
    this.setDefaultEmail.emit(false)
    $('#updateUser').modal('hide');
  }
  


  seleccionImage(archivo: any) {
    const file = archivo.files[0]
    if (!file) {
      this.imagenSubir = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      Swal.fire(
        'Solo se permiten imagenes',
        'El archivo seleccionado no es una imagen',
        'error'
      );
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = file;
    // Cargar imagen temporal
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imagenSubirTemp = reader.result;
      console.log(reader.result);
    };
  }

  cambiarImagen() {
    // this.loading = true;
    
    const interval = setInterval(() => {
      // console.log('cambia imagen');
      this.loading = true;
      if (this.cont < 100) {
        this.cont = this.cont + 20;
        let barra: any = document.getElementById('barraProgreso');
        barra = barra.style.width = this.cont + '%';
        console.log('cambia imagen', barra);
        document.getElementById('barraProgreso').innerHTML = this.cont + '%';
        if (this.cont >= 100) {
          // this.otrosService.cambiarImagen(this.imagenSubir, this.otro._id);
          $('#updateUser').modal('hide');
          setTimeout(() => {
            this.imagenSubirTemp = null;
            this.imagenSubir = null;
          }, 800);
        }
      }

      if (this.cont === 100) {
        clearInterval(interval);
        this.cont = 0;
        const barra: any = document.getElementById('barraProgreso');
        barra.style.width = this.cont + '%';
      }


    },1000)
  }
}
