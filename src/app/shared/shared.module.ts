import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormatRutPipe } from './pipes/format.pipe';


@NgModule({
  declarations: [FormatRutPipe],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [FormatRutPipe]
})
export class SharedModule { }
