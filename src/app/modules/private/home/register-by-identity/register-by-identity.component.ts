import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUser } from 'src/app/modules/public/interfaces/register.user..interface';


declare var $: any

@Component({
  selector: 'app-register-by-identity',
  templateUrl: './register-by-identity.component.html',
  styleUrls: ['./register-by-identity.component.scss']
})
export class RegisterByIdentityComponent {

  @Output() formValueIdentity = new EventEmitter<RegisterUser>();
  private readonly fb = inject(FormBuilder);
  private readonly decimalPipe = inject(DecimalPipe);
  public validRut = false;
  public formOptions: AbstractControlOptions = {
    validators: [this.sonIguales('password', 'password2')]
  }

  get formsValue() {
    return this.form.controls;
  }

  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    nro_identity: ['', [Validators.required,]],
    password:['', [Validators.required, Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).+$/)]],
    password2: ['', [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[A-Z]).*[0-9].*$')]],
    check1: [false, []],
    check2: [false, []],
    check3: [false, []],
    check4: [false, []],
  });



  public blurRutInput() {
    if (this.form.controls['nro_identity'].value && this.form.controls['nro_identity'].value !== '-') {
      let documentNumberInput: string = this.form.controls['nro_identity'].value;
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

  sonIguales(campo1: string, campo2: string): any {
    return ((group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };
    });
  }

  campoNoEsValido (campo: string): any {
    return this.form?.controls[campo]?.errors && this.form?.controls[campo]?.touched; 
  }

  onSubmit(){
    let roles: string[] = [];
    
    if (this.formsValue['check1'].value && this.formsValue['check2'].value && this.formsValue['check3'].value && this.formsValue['check4'].value) {
      this.formsValue['check1'].setValue('ADMIN');
      this.formsValue['check2'].setValue('DOCENTE');
      this.formsValue['check3'].setValue('ESTUDIANTE');
      this.formsValue['check4'].setValue('PARENTS');
      roles.push(this.formsValue['check1'].value, this.formsValue['check2'].value, this.formsValue['check3'].value, this.formsValue['check4'].value)
    } else if (this.formsValue['check1'].value && this.formsValue['check2'].value && this.formsValue['check3'].value && !this.formsValue['check4'].value) {
      this.formsValue['check1'].setValue('ADMIN');
      this.formsValue['check2'].setValue('DOCENTE');
      this.formsValue['check3'].setValue('ESTUDIANTE');
      roles.push(this.formsValue['check1'].value, this.formsValue['check2'].value, this.formsValue['check3'].value)
    } else if (this.formsValue['check1'].value && this.formsValue['check2'].value && !this.formsValue['check3'].value && !this.formsValue['check4'].value) {
      this.formsValue['check1'].setValue('ADMIN');
      this.formsValue['check2'].setValue('DOCENTE');
      roles.push(this.formsValue['check1'].value, this.formsValue['check2'].value)
    } else if (this.formsValue['check1'].value && !this.formsValue['check2'].value && !this.formsValue['check3'].value && !this.formsValue['check4'].value) {
      this.formsValue['check1'].setValue('ADMIN');
      roles.push(this.formsValue['check1'].value);
    } else if (this.formsValue['check1'].value && !this.formsValue['check2'].value && this.formsValue['check3'].value && !this.formsValue['check4'].value) {
      this.formsValue['check1'].setValue('ADMIN');
      this.formsValue['check3'].setValue('ESTUDIANTE');
      roles.push(this.formsValue['check1'].value, this.formsValue['check3'].value);
    } else if (this.formsValue['check1'].value && !this.formsValue['check2'].value && !this.formsValue['check3'].value && this.formsValue['check4'].value) {
      this.formsValue['check1'].setValue('ADMIN');
      this.formsValue['check4'].setValue('PARENTS');
      roles.push(this.formsValue['check1'].value, this.formsValue['check4'].value);
    } else if (this.formsValue['check1'].value && !this.formsValue['check2'].value && this.formsValue['check3'].value && this.formsValue['check4'].value) {
      this.formsValue['check1'].setValue('ADMIN');
      this.formsValue['check3'].setValue('ESTUDIANTE');
      this.formsValue['check4'].setValue('PARENTS');
      roles.push(this.formsValue['check1'].value, this.formsValue['check3'].value, this.formsValue['check4'].value)
    } else if (this.formsValue['check1'].value && this.formsValue['check2'].value && !this.formsValue['check3'].value && this.formsValue['check4'].value) {
      this.formsValue['check1'].setValue('ADMIN');
      this.formsValue['check2'].setValue('DOCENTE');
      this.formsValue['check4'].setValue('PARENTS');
      roles.push(this.formsValue['check1'].value, this.formsValue['check2'].value, this.formsValue['check4'].value);
    } else if (!this.formsValue['check1'].value && this.formsValue['check2'].value && this.formsValue['check3'].value && this.formsValue['check4'].value) {
      this.formsValue['check2'].setValue('DOCENTE');
      this.formsValue['check3'].setValue('ESTUDIANTE');
      this.formsValue['check4'].setValue('PARENTS');
      roles.push(this.formsValue['check2'].value, this.formsValue['check3'].value, this.formsValue['check4'].value);
    }else if (!this.formsValue['check1'].value && this.formsValue['check2'].value && this.formsValue['check3'].value && !this.formsValue['check4'].value) {
      this.formsValue['check2'].setValue('DOCENTE');
      this.formsValue['check3'].setValue('ESTUDIANTE');
      roles.push(this.formsValue['check2'].value, this.formsValue['check3'].value);
    } else if (!this.formsValue['check1'].value && this.formsValue['check2'].value && !this.formsValue['check3'].value && this.formsValue['check4'].value) {
      this.formsValue['check2'].setValue('DOCENTE');
      this.formsValue['check4'].setValue('PARENTS');
      roles.push(this.formsValue['check2'].value, this.formsValue['check4'].value);
    }  else if (!this.formsValue['check1'].value && this.formsValue['check2'].value && !this.formsValue['check3'].value && !this.formsValue['check4'].value) {
      this.formsValue['check2'].setValue('DOCENTE');
      roles.push(this.formsValue['check2'].value);
    } else if (!this.formsValue['check1'].value && !this.formsValue['check2'].value && this.formsValue['check3'].value && !this.formsValue['check4'].value) {
      this.formsValue['check3'].setValue('ESTUDIANTE');
      roles.push(this.formsValue['check3'].value);
    } else if (!this.formsValue['check1'].value && !this.formsValue['check2'].value && this.formsValue['check3'].value && this.formsValue['check4'].value) {
      this.formsValue['check3'].setValue('ESTUDIANTE');
      this.formsValue['check4'].setValue('PARENTS')
      roles.push(this.formsValue['check3'].value, this.formsValue['check4'].value);
    } else if (!this.formsValue['check1'].value && !this.formsValue['check2'].value && !this.formsValue['check3'].value && this.formsValue['check4'].value) {
      this.formsValue['check4'].setValue('PARENTS');
      roles.push(this.formsValue['check4'].value);
    }

    const newUser: RegisterUser = {
      name: this.formsValue['name'].value,
      nro_identity: this.formsValue['nro_identity'].value.replace(/\./g,''),
      password: this.formsValue['password'].value,
      roles
    }
    this.formValueIdentity.emit(newUser);
    this.form.reset();
    $('#addcontact').modal('hide');
  }
}
