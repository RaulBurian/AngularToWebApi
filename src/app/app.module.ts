import { AuthService } from './auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePostComponent } from './posts/create/create-post/create-post.component';
import { ListPostsComponent } from './posts/list-posts/list-posts.component';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {UnAuthorizedInterceptor} from './interceptors/un-authorized.interceptor';
import {StorageService} from './shared/services/storage.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { CreatePostModalComponent } from './posts/create/create-post-modal/create-post-modal.component';
import { BaseCreateComponent } from './posts/create/base-create/base-create.component';
import { NumberNotNullPipe } from './pipes/number-not-null.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    ListPostsComponent,
    LoginComponent,
    RegisterComponent,
    EditPostComponent,
    CreatePostModalComponent,
    BaseCreateComponent,
    NumberNotNullPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
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
