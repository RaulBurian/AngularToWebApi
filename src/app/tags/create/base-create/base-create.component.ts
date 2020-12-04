import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-base-create-tag',
  templateUrl: './base-create.component.html',
  styleUrls: ['./base-create.component.css']
})
export class BaseCreateComponent implements OnInit {
  addForm: FormGroup;
  private nameFormControl=new FormControl();

  @Output()
  newFormControl: EventEmitter<FormControl>=new EventEmitter<FormControl>();

  constructor() {
    this.addForm=new FormGroup({
      name: this.nameFormControl
    });
  }

  ngOnInit(): void {
    this.newFormControl.emit(this.nameFormControl);
  }

}
