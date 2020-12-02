import { AuthService } from './auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { ListPostsComponent } from './posts/list-posts/list-posts.component';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {UnAuthorizedInterceptor} from './interceptors/un-authorized.interceptor';
import { UserExistsPipe } from './pipes/user-exists.pipe';
import { ErrorExistsPipe } from './pipes/error-exists.pipe';
import {UserStorageService} from './shared/services/user-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    ListPostsComponent,
    LoginComponent,
    RegisterComponent,
    UserExistsPipe,
    ErrorExistsPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UnAuthorizedInterceptor, multi: true},
    AuthService,
    UserStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
