import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GenericListComponent} from './generic-list/generic-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    GenericListComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
  ],
  exports: [
    GenericListComponent
  ]
})
export class SharedModule {
}
