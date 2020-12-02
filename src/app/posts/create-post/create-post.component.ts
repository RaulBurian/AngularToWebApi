import { Component, OnInit } from '@angular/core';
import {PostsService} from '../posts.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  tags: boolean[]=[];
  tagsNumber: number=0;
  name: string='';
  addForm: FormGroup;

  constructor(private postsService:PostsService) {
    this.addForm=new FormGroup({
      name: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  add() {
    const tags: string[]=[];
    const name: string=this.addForm.controls.name.value;
    const keys: string[]=Object.keys(this.addForm.controls);
    keys.shift();
    keys.forEach(key=>{
      tags.push(this.addForm.controls[key].value);
    });
    this.postsService.addPost({name,tags}).subscribe(_=>{
      for (let controlsKey in this.addForm.controls) {
        this.addForm.controls[controlsKey].setValue('');
      }
    });
  }

  addTag() {
    this.tagsNumber++;
    this.tags.push(true);
    this.addForm.addControl(`tag${this.tagsNumber}`,new FormControl());
  }
}
