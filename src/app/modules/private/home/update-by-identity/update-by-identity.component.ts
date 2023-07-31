import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges, inject, OnInit, OnChanges } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdatedUser } from 'src/app/modules/public/interfaces/register.user..interface';
import { AuthService } from 'src/app/modules/public/service/auth.service';

declare var $: any;


@Component({
  selector: 'app-update-by-identity',
  templateUrl: './update-by-identity.component.html',
  styleUrls: ['./update-by-identity.component.scss']
})
export class UpdateByIdentityComponent implements OnInit, OnChanges {
  @Output() formValueNroIdentity = new EventEmitter<any>();
  @Output() setDefaultEmailDefault = new EventEmitter<boolean>();
  private readonly authService = inject(AuthService);
  private fb = inject(FormBuilder);
  @Input() user!: any;

  private readonly decimalPipe = inject(DecimalPipe);
  public validRut = false;

  public formOptions: AbstractControlOptions = {
    validators: [this.sonIguales('password', 'password2')],
  };

  public form!: FormGroup;

  get formsValue() {
    return this.form.controls;
  }



  ngOnInit(): void {
    // console.log(this.authService.userToUpdate?.name);
    // console.log(this.user);
    this.form = this.fb.group({
      name: [this.authService.userToUpdate?.name, [Validators.required]],
      nro_identity: [this.authService.userToUpdate?.nro_identity, [Validators.required]],
      check1: [this.setValueAdm(this.authService.userToUpdate?.roles)],
      check2: [this.setValueDocente(this.authService.userToUpdate?.roles)],
      check3: [this.setValueEstudiante(this.authService.userToUpdate?.roles)],
      check4: [this.setValueParents(this.authService.userToUpdate?.roles)],
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log('here',this.user);
    this.form = this.fb.group(
      {
        name: [changes['user'].currentValue?.name, [Validators.required]],
        nro_identity: [changes['user'].currentValue?.nro_identity, []],
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
    console.log(this.user?.nro_identity);
    this.form = this.fb.group(
      {
        name: [this.user.name, [Validators.required]],
        nro_identity: [this.user?.nro_identity, []],
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
    this.setDefaultEmailDefault.emit(false)
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
      nro_identity: this.formsValue['nro_identity'].value,
      // password: this.formsValue['password'].value,
      roles,
    };

    // console.log({ updatedUser });
    console.log({updatedUser, id:this.user._id});

    this.formValueNroIdentity.emit({updatedUser, id:this.user._id});
    // this.form.reset();
    
    $('#updateUser').modal('hide');
  }


  public blurRutInput() {
    if (this.form.controls['nro_identity']?.value && this.form.controls['nro_identity']?.value !== '-') {
      let documentNumberInput: string = this.form.controls['nro_identity']?.value;
      documentNumberInput = documentNumberInput.replace(/([.|-])*/g, '');
      const documentNumberWithoutDV = documentNumberInput.substring(-1, documentNumberInput.length - 1);
      const dv = documentNumberInput[documentNumberInput.length - 1];
      documentNumberWithoutDV != '' ? this.form.controls['nro_identity'].setValue(this.decimalPipe.transform(documentNumberWithoutDV, '', 'es-CL') + '-' + dv) : '';
      this.validateRutFormat(this.form.controls['nro_identity'].value);
    } else {
      this.form.controls['nro_identity'].setValue('');
      this.validRut = false;
    }
  }

  validateRutFormat(documentNumberIn: any) {
    const documentNumberFormat = documentNumberIn.replace(/([.\-])+/g, '');
    if (documentNumberFormat !== '') {
      if (!(documentNumberFormat[documentNumberFormat?.length - 1].toUpperCase() === this.dvCalculator(documentNumberFormat.substring(0, documentNumberFormat.length - 1)))) {
        this.validRut = false;
        this.form.controls['nro_identity'].setErrors({ validRut: this.validRut });
        return;
      } else {
        this.validRut = true;
        return;
      }
    }
  }

  dvCalculator(documentNumber: string): string {
    let serie = 2;
    let documentNumberSum = 0;
    for (let i = documentNumber.length - 1; i >= 0; i--) {
      documentNumberSum = documentNumberSum + (+documentNumber[i] * serie);
      serie = serie === 7 ? 2 : serie + 1;
    }
    let dv: any = 11 - (documentNumberSum % 11);
    switch (dv) {
      case 11:
        dv = 0;
        break;
      case 10:
        dv = 'K';
        break;
    }
    return dv.toString();
  }

  caracteresRut(event: any) {
    return /[0-9kK.-]/.test(event.key) || event.key === 'Tab' || event.key === 'Backspace' || event.key === 'ArrowRight' ||
      event.key === 'ArrowLeft' || event.key === 'Delete';
  }


  public focusRutInput() {
    if (this.form.controls['nro_identity'].value) {
      let documentNumberInput = this.form.controls['nro_identity'].value;
      documentNumberInput = documentNumberInput.replace(/([.|-])*/g, '');
      this.form.controls['nro_identity'].setValue(documentNumberInput);
    }
  }

}
