import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipeModule } from 'src/app/shared/pipes/pipes.module';
import { ImagenPipe } from 'src/app/shared/pipes/img-pipe.pipe';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PipeModule
  ],
  providers: [DecimalPipe, ImagenPipe]
})
export class ProfileModule { }
