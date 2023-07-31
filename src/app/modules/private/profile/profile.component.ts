import { Component, DoCheck, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { User } from '../../public/interfaces/login.interface';
import { AuthService } from '../../public/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdatedUser } from '../../public/interfaces/register.user..interface';
import { DecimalPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  public usuario!: User;
  public readonly userService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly decimalPipe = inject(DecimalPipe);
  public validRut = false;

  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.pattern(/^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-zA-Z]{2,5})$/)]],
    username: ['', [Validators.pattern(/^[a-zA-Z0-9]+$/)]],
    nro_identity: ['', []],
    check1: [false, []],
    check2: [false, []],
    check3: [false, []],
    check4: [false, []],
  });

  get formsValue() {
    return this.form.controls;
  }

  constructor() {}

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('userLoged')!);
    this.form.controls['name'].setValue(this.usuario.name);
    this.form.controls['username'].setValue(this.usuario.username);
    this.form.controls['nro_identity'].setValue(this.usuario.nro_identity);
    this.form.controls['email'].setValue(this.usuario.email);
  }

  async onSubmit() {
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
      this.formsValue['check4'].setValue('PARENTS');
      roles.push(this.formsValue['check3'].value, this.formsValue['check4'].value);
    } else if (!this.formsValue['check1'].value && !this.formsValue['check2'].value && !this.formsValue['check3'].value && this.formsValue['check4'].value) {
      this.formsValue['check4'].setValue('PARENTS');
      roles.push(this.formsValue['check4'].value);
    }

    const updatedUser: UpdatedUser = {
      name: this.formsValue['name'].value,
      email: this.formsValue['email'].value,
      username: this.formsValue['username'].value,
      nro_identity: this.formsValue['nro_identity'].value.replace(/\./g,''),
      roles
    }
    if (!updatedUser.email) {
      delete updatedUser.email;
    }
    if (!updatedUser.username) {
      delete updatedUser.username;
    }

    if (!updatedUser.nro_identity) {
      delete updatedUser.nro_identity;
    }

    const res = await this.userService.updated({updatedUser}, this.usuario._id).then(async(res) => {
      await Swal.fire({
        title: 'Espere por favor...',
        timer: 2000,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          localStorage.setItem('userLoged', JSON.stringify(res))
          this.usuario = JSON.parse(localStorage.getItem('userLoged')!);
          this.form.patchValue({
            check1: false,
            check2: false,
            check3: false,
            check4: false,
          });
        }
      });

    }).catch((err) => {
      console.log({err});
    });
  }

  campoNoEsValido(campo: string): any {
    return this.form?.controls[campo]?.errors && this.form?.controls[campo]?.touched;
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
