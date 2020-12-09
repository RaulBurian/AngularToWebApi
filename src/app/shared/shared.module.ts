import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GenericListComponent} from './generic-list/generic-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { GenericListV2Component } from './generic-list-v2/generic-list-v2.component';


@NgModule({
  declarations: [
    GenericListComponent,
    GenericListV2Component
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
  ],
  exports: [
    GenericListComponent,
    GenericListV2Component
  ]
})
export class SharedModule {
}
