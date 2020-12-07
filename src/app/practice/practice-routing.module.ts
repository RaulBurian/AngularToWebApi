import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TemplateFormsPracticeComponent} from './template-forms-practice/template-forms-practice.component';
import {ReactiveFormsPracticeComponent} from './reactive-forms-practice/reactive-forms-practice.component';

const routes: Routes = [
  {path: 'templateForms', component: TemplateFormsPracticeComponent},
  {path: 'reactiveForms', component: ReactiveFormsPracticeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticeRoutingModule {
}
