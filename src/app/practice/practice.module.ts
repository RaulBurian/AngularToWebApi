import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PracticeRoutingModule} from './practice-routing.module';
import {TemplateFormsPracticeComponent} from './template-forms-practice/template-forms-practice.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormsPracticeService} from './forms-practice.service';
import { ReactiveFormsPracticeComponent } from './reactive-forms-practice/reactive-forms-practice.component';


@NgModule({
  declarations: [
    TemplateFormsPracticeComponent,
    ReactiveFormsPracticeComponent
  ],
  imports: [
    CommonModule,
    PracticeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FormsPracticeService
  ]
})
export class PracticeModule {
}
