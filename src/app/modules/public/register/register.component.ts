import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { RegisterUser } from '../interfaces/register.user..interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly decimalPipe = inject(DecimalPipe);



  get formsValue() {
    return this.form.controls;
  }
  public form: FormGroup = this.fb.group({
    email: ['', [Validators.pattern(/^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-zA-Z]{2,5})$/)]],
    username: ['', [Validators.pattern(/^[a-zA-Z0-9]+$/)]],
    nro_identity: ['', []],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[A-Z]).*[0-9].*$')]],
    password2: ['', [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[A-Z]).*[0-9].*$')]],
    agree: [false, [Validators.required]],
  }, { validators: this.sonIguales('password', 'password2') });

  public validRut = false;

  constructor(private fb: FormBuilder) {

  }


  ngOnInit(): void {

  }

  goToLogin() {
    this.authService.goToLogin();
  }


 async  onSubmit() {
    console.log(JSON.stringify(this.form.value));
    if (this.form.invalid) {
      return;
    }
    const newUser: RegisterUser = {
      name: 'Adrian',
      // email: this.formsValue['email'].value,
      username: this.formsValue['username'].value,
      // nro_identity: this.formsValue['nro_identity'].value,
      password: this.formsValue['password'].value,
      roles: ['ESTUDIANTE', 'DOCENTE']
    }

    // if ((newUser.email == '' && newUser.username == '' && newUser.nro_identity == '')) {
      if ((newUser.username == '')) {
      console.log('al menos uno debe ir lleno ');
      return;
    }

    const resp = await this.authService.register(newUser).catch((err) => {
      console.log({err});
      // Swal.fire({
      //   position: 'center',
      //   icon: 'error',
      //   title: err?.error?.message,
      //   showConfirmButton: false,
      //   timer: 2000,
      //   showCancelButton: false, 
      //   allowOutsideClick: false
      // });
    });
    console.log(resp);

  }

  campoNoEsValido(campo: string): any {
    return this.form?.controls[campo]?.errors && this.form?.controls[campo]?.touched;
  }

  caracteresRut(event: any) {
    return /[0-9kK.-]/.test(event.key) || event.key === 'Tab' || event.key === 'Backspace' || event.key === 'ArrowRight' ||
      event.key === 'ArrowLeft' || event.key === 'Delete';
  }


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

  public focusRutInput() {
    if (this.form.controls['nro_identity'].value) {
      let documentNumberInput = this.form.controls['nro_identity'].value;
      documentNumberInput = documentNumberInput.replace(/([.|-])*/g, '');
      this.form.controls['nro_identity'].setValue(documentNumberInput);
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


  sonIguales(campo1: string, campo2: string) {
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


}
