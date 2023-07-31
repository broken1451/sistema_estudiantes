import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/modules/public/interfaces/login.interface';
import { UpdatedUser } from 'src/app/modules/public/interfaces/register.user..interface';
import { AuthService } from 'src/app/modules/public/service/auth.service';

declare var $: any;


@Component({
  selector: 'app-update-by-username',
  templateUrl: './update-by-username.component.html',
  styleUrls: ['./update-by-username.component.scss']
})
export class UpdateByUsernameComponent implements OnInit, OnChanges {

  @Output() formValueUsername = new EventEmitter<any>();
  @Output() setDefaultEmail = new EventEmitter<boolean>();
  private readonly authService = inject(AuthService);
  private fb = inject(FormBuilder);
  @Input() user!: any;



  public formOptions: AbstractControlOptions = {
    validators: [this.sonIguales('password', 'password2')],
  };

  public form!: FormGroup;

  get formsValue() {
    return this.form.controls;
  }



  ngOnInit(): void {
    console.log(this.authService.userToUpdate?.name);
    console.log(this.user);
    this.form = this.fb.group({
      name: [this.authService.userToUpdate?.name, [Validators.required]],
      username: [this.authService.userToUpdate?.username, [Validators.required, Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).+$/)]],
      check1: [this.setValueAdm(this.authService.userToUpdate?.roles)],
      check2: [this.setValueDocente(this.authService.userToUpdate?.roles)],
      check3: [this.setValueEstudiante(this.authService.userToUpdate?.roles)],
      check4: [this.setValueParents(this.authService.userToUpdate?.roles)],
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.user);
    this.form = this.fb.group(
      {
        name: [changes['user'].currentValue?.name, [Validators.required]],
        username: [changes['user'].currentValue?.username, [Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).+$/)]],
        // check1: [this.isAdmin],
        // check2: [this.isDocente],
        // check3: [this.isEstudiante],
        // check4: [this.isParents],
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
        username: [this.user?.username, [Validators.pattern(/^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-zA-Z]{2,5})$/)]],
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
      username: this.formsValue['username'].value,
      // password: this.formsValue['password'].value,
      roles,
    };

    // console.log({ updatedUser });
    console.log({updatedUser, id:this.user._id});

    this.formValueUsername.emit({updatedUser, id:this.user._id, isCorreo: true});
    // this.form.reset();
    
    $('#updateUser').modal('hide');
  }

}
