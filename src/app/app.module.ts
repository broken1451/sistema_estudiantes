import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData, TitleCasePipe } from '@angular/common';
import localeCL from '@angular/common/locales/es-CL';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './modules/public/service/auth.service';
import { ServiceInterceptorsModule } from './shared/interceptor/interceptors.service.module';


registerLocaleData(localeCL, 'es-CL');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceInterceptorsModule
    // SharedModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
