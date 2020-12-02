import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PostsService} from '../posts.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.css']
})
export class CreatePostModalComponent implements OnInit {


  tags: boolean[] = [];
  tagsNumber: number = 0;
  name: string = '';
  addForm: FormGroup;

  constructor(private postsService: PostsService,
              public activeModal: NgbActiveModal) {
    this.addForm = new FormGroup({
      name: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  add() {
    const tags: string[] = [];
    const name: string = this.addForm.controls.name.value;
    const keys: string[] = Object.keys(this.addForm.controls);
    keys.shift();
    keys.forEach(key => {
      tags.push(this.addForm.controls[key].value);
    });
    this.postsService.addPost({name, tags}).subscribe(result => {
      this.activeModal.close((result));
    });
  }

  addTag() {
    this.tagsNumber++;
    this.tags.push(true);
    this.addForm.addControl(`tag${this.tagsNumber}`, new FormControl());
  }

  close() {
    this.activeModal.dismiss();
  }
}
