import { AuthService } from './auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {UnAuthorizedInterceptor} from './interceptors/un-authorized.interceptor';
import {StorageService} from './shared/services/storage.service';
import { HomeComponent } from './home/home.component';
import { UserIsAdminPipe } from './pipes/user-is-admin.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserIsAdminPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UnAuthorizedInterceptor, multi: true},
    AuthService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
