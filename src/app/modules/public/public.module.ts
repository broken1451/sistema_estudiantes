import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { AuthService } from './service/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipeModule } from 'src/app/shared/pipes/pipes.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PublicRoutingModule,
    PipeModule
  ],
  providers: [AuthService],
  exports: []
})
export class PublicModule { }
