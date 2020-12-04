import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListTagsComponent} from './list-tags/list-tags.component';
import {CreateTagComponent} from './create/create-tag/create-tag.component';

const routes: Routes = [
  {path: 'list', component: ListTagsComponent},
  {path: 'create', component: CreateTagComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule {
}
