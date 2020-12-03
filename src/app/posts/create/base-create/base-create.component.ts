import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PostsService} from '../../posts.service';

@Component({
  selector: 'app-base-create',
  templateUrl: './base-create.component.html',
  styleUrls: ['./base-create.component.css']
})
export class BaseCreateComponent implements OnInit {

  tags: boolean[] = [];
  tagsNumber: number = 0;
  name: string = '';
  addForm: FormGroup;
  private nameFormControl=new FormControl();

  @Output()
  newFormControl: EventEmitter<FormControl> = new EventEmitter<FormControl>();

  constructor() {
    this.addForm = new FormGroup({
      name: this.nameFormControl
    });
  }

  ngOnInit(): void {
    this.newFormControl.emit(this.nameFormControl);
  }

  emitNewFormControl() {
    this.tagsNumber++;
    this.tags.push(true);
    const newFormControl: FormControl = new FormControl();
    this.addForm.addControl(`tag${this.tagsNumber}`, newFormControl);
    this.newFormControl.emit(newFormControl);
  }
}
