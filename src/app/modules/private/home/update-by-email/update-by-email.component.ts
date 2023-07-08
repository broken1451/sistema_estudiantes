import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControlOptions } from '@angular/forms';
import { User } from '../../../public/interfaces/user.interfaces';
import { UpdatedUser } from 'src/app/modules/public/interfaces/register.user..interface';
import { AuthService } from 'src/app/modules/public/service/auth.service';

declare var $: any



@Component({
  selector: 'app-update-by-email',
  templateUrl: './update-by-email.component.html',
  styleUrls: ['./update-by-email.component.scss']
})
export class UpdateByEmailComponent implements OnChanges, DoCheck{


  @Output() formValueEmail = new EventEmitter<UpdatedUser>();
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  @Input() user!: User;

  public formOptions: AbstractControlOptions = {
    validators: [this.sonIguales('password', 'password2')]
  }

  public form!: FormGroup;

  get formsValue() {
    return this.form.controls;
  }


  ngDoCheck(): void {
    console.log('chamhes',  this.authService.userToUpdate );
    this.form = this.fb.group({
      name: [this.authService.userToUpdate?.name , [Validators.required]],
      email: ['', [Validators.pattern(/^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-zA-Z]{2,5})$/)]],
      // password: ['', [Validators.required, Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).+$/)]],
      // password2: ['', [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[A-Z]).*[0-9].*$')]],
      check1: [
        // (this.authService.userToUpdate?.roles[0] == 'ADMIN')? true: (this.authService.userToUpdate?.roles[0] == 'ESTUDIANTE'), 
       ( this.authService.userToUpdate?.roles[0] === 'ADMIN' ) ? true : (this.authService.userToUpdate?.roles[0] === 'ESTUDIANTE') ? false : '',
        []],
      check2: [false, []],
      check3: [
        false , 
        []],
      check4: [false, []],
    }, 
    // this.formOptions 
    );
 }

  ngOnChanges(changes: SimpleChanges): void {
   console.log(changes);
  }




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

    const updatedUser: UpdatedUser = {
      name: this.formsValue['name'].value,
      email: this.formsValue['email'].value,
      // password: this.formsValue['password'].value,
      roles
    }

    console.log({updatedUser});

    this.formValueEmail.emit(updatedUser);
    this.form.reset();
    $('#updateUser').modal('hide');

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
}
