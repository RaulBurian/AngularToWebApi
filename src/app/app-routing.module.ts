import {CreatePostComponent} from './posts/create/create-post/create-post.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListPostsComponent} from './posts/list-posts/list-posts.component';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'posts', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule), canActivate: [AuthGuard]},
  // {path: 'list', component: ListPostsComponent, canActivate: [AuthGuard]},
  // {path: 'create', component: CreatePostComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
