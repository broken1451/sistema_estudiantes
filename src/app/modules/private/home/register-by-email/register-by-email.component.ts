import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControlOptions } from '@angular/forms';
import { RegisterUser } from 'src/app/modules/public/interfaces/register.user..interface';
import { AuthService } from 'src/app/modules/public/service/auth.service';

declare var $: any

@Component({
  selector: 'app-register-by-email',
  templateUrl: './register-by-email.component.html',
  styleUrls: ['./register-by-email.component.scss']
})
export class RegisterByEmailComponent {

  @Output() validForm = new EventEmitter<boolean>();
  @Output() formValueEmail = new EventEmitter<RegisterUser>();
  @Output() setDefaultEmail = new EventEmitter<boolean>();
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  public formOptions: AbstractControlOptions = {
    validators: [this.sonIguales('password', 'password2')]
  }

  get formsValue() {
    return this.form.controls;
  }

  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.pattern(/^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-zA-Z]{2,5})$/)]],
    password: ['', [Validators.required, Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).+$/)]],
    password2: ['', [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[A-Z]).*[0-9].*$')]],
    check1: [false, []],
    check2: [false, []],
    check3: [false, []],
    check4: [false, []],
  }, this.formOptions );
  // ,{ validators: this.sonIguales('password', 'password2') }

  campoNoEsValido(campo: string): any {
    return this.form?.controls[campo]?.errors && this.form?.controls[campo]?.touched;
  }

  onSubmit() {
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
      email: this.formsValue['email'].value,
      password: this.formsValue['password'].value,
      roles
    }
    this.formValueEmail.emit(newUser);
    this.form.reset();
    $('#addcontact').modal('hide');
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

  cancel(){
    this.form.reset()
    $('#addcontact').modal('hide');
    this.setDefaultEmail.emit(false)
  }

}
