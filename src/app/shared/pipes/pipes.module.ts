import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './img-pipe.pipe';
import { FormatRutPipe } from './format.pipe';




@NgModule({
  declarations: [ImagenPipe, FormatRutPipe],
  imports: [
    CommonModule
  ],
  providers: [ImagenPipe],
  exports: [ImagenPipe, FormatRutPipe]
})
export class PipeModule { }