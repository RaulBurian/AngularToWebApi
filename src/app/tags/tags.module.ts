import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TagsRoutingModule} from './tags-routing.module';
import {ListTagsComponent} from './list-tags/list-tags.component';
import {TagsService} from './tags.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PostsModule} from '../posts/posts.module';
import {BaseCreateComponent} from './create/base-create/base-create.component';
import {CreateTagComponent} from './create/create-tag/create-tag.component';
import {CreateTagModalComponent} from './create/create-tag-modal/create-tag-modal.component';
import { ToGenericDataPipe } from './pipes/to-generic-data.pipe';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    ListTagsComponent,
    BaseCreateComponent,
    CreateTagComponent,
    CreateTagModalComponent,
    ToGenericDataPipe,
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    NgbModule,
    FormsModule,
    PostsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    TagsService
  ]
})
export class TagsModule {
}
