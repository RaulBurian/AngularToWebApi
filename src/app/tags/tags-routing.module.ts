import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListTagsComponent} from './list-tags/list-tags.component';

const routes: Routes = [
  {path: 'list', component: ListTagsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule {
}
