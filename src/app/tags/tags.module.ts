import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TagsRoutingModule} from './tags-routing.module';
import {ListTagsComponent} from './list-tags/list-tags.component';
import {TagsService} from './tags.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {PostsModule} from '../posts/posts.module';
import {NumberNotNullPipe} from '../posts/pipes/number-not-null.pipe';


@NgModule({
  declarations: [
    ListTagsComponent,
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    NgbModule,
    FormsModule,
    PostsModule
  ],
  providers:[
    TagsService
  ]
})
export class TagsModule {
}
