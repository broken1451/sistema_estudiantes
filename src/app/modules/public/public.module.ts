import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { AuthService } from './service/auth.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PublicRoutingModule
  ],
  providers: [AuthService],
  exports: []
})
export class PublicModule { }
