import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AuthService } from '../../public/service/auth.service';
import { RegisterByEmailComponent } from './register-by-email/register-by-email.component';
import { RegisterByUseNameComponent } from './register-by-use-name/register-by-use-name.component';
import { RegisterByIdentityComponent } from './register-by-identity/register-by-identity.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateByEmailComponent } from './update-by-email/update-by-email.component';
import { UpdateByUsernameComponent } from './update-by-username/update-by-username.component';
import { UpdateByIdentityComponent } from './update-by-identity/update-by-identity.component';


@NgModule({
  declarations: [
    HomeComponent,
    RegisterByEmailComponent,
    RegisterByUseNameComponent,
    RegisterByIdentityComponent,
    UpdateByEmailComponent,
    UpdateByUsernameComponent,
    UpdateByIdentityComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [HomeComponent],
  providers: [AuthService, DecimalPipe]
})
export class HomeModule { }
