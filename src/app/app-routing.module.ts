import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {RoleGuard} from './guards/role.guard';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'posts', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule), canActivate: [AuthGuard]},
  {path: 'tags', loadChildren: () => import('./tags/tags.module').then(m => m.TagsModule), canActivate: [AuthGuard, RoleGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
