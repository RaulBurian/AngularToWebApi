import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreatePostComponent} from './create/create-post/create-post.component';
import {ListPostsComponent} from './list-posts/list-posts.component';
import {DetailPostComponent} from './detail-post/detail-post.component';

const routes: Routes = [
  {path: 'create', component: CreatePostComponent},
  {path: 'list', component: ListPostsComponent},
  {path: 'detail/:postId', component: DetailPostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {
}
