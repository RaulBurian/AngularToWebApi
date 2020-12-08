import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreatePostComponent} from './create/create-post/create-post.component';
import {ListPostsComponent} from './list-posts/list-posts.component';
import {SearchPostsComponent} from './search-posts/search-posts.component';

const routes: Routes = [
  {path: 'create', component: CreatePostComponent},
  {path: 'list', component: ListPostsComponent},
  {path: 'search', component: SearchPostsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {
}
