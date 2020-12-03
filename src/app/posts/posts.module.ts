import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostsRoutingModule} from './posts-routing.module';
import {CreatePostComponent} from './create/create-post/create-post.component';
import {CreatePostModalComponent} from './create/create-post-modal/create-post-modal.component';
import {EditPostComponent} from './edit-post/edit-post.component';
import {ListPostsComponent} from './list-posts/list-posts.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NumberNotNullPipe} from '../pipes/number-not-null.pipe';
import {BaseCreateComponent} from './create/base-create/base-create.component';

@NgModule({
  declarations: [
    CreatePostComponent,
    CreatePostModalComponent,
    EditPostComponent,
    ListPostsComponent,
    NumberNotNullPipe,
    BaseCreateComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ]
})
export class PostsModule {
}