import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsUserModel} from '../models/FormsUserModel';
import {FormsPracticeService} from '../forms-practice.service';
import {catchError} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-template-forms-practice',
  templateUrl: './template-forms-practice.component.html',
  styleUrls: ['./template-forms-practice.component.css']
})
export class TemplateFormsPracticeComponent implements OnInit, OnDestroy {

  topics: string[] = ['Angular', 'React', 'Vue'];
  userModel: FormsUserModel;
  topicHasError: boolean = true;
  errorMessage: Observable<string>;
  sub: Subscription[] = [];

  constructor(private formsService: FormsPracticeService) {
    this.userModel = {
      name: '',
      email: 'raul@raul.com',
      offers: true,
      phone: 745061325,
      timePreference: 'morning',
      topic: 'default'
    };
    this.errorMessage = this.formsService.getErrorObservable();
  }

  ngOnInit(): void {
  }

  validateTopic(value: string): void {
    this.topicHasError = value === 'default';
  }

  onSubmit(): void {
    this.sub.push(
      this.formsService.add(this.userModel).subscribe(_ => {
      }));
  }

  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe());
  }

}
