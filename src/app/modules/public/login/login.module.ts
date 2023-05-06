import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AuthService } from '../service/auth.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailFormComponent } from './login-form/email-form/email-form.component';
import { UserFormComponent } from './login-form/user-form/user-form.component';
import { IdentityFormComponent } from './login-form/identity-form/identity-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    EmailFormComponent,
    UserFormComponent,
    IdentityFormComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [AuthService, DecimalPipe],
})
export class LoginModule { }
