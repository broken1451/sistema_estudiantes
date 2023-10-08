import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormatRutPipe } from './pipes/format.pipe';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from './pipes/pipes.module';


@NgModule({
  declarations: [
    BreadcumbsComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, SharedRoutingModule, ReactiveFormsModule, FormsModule, PipeModule],
  exports: [
    BreadcumbsComponent,
    HeaderComponent,
    SidebarComponent,
  ],
})
export class SharedModule {}
