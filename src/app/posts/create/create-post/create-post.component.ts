import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../posts.service';
import {AbstractCreateComponentPost} from '../abstract-create/abstract-create.component-post';
import {PostResponseObject} from '../../contracts/responses/PostResponseObject';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent extends AbstractCreateComponentPost implements OnInit {

  constructor(postsService: PostsService) {
    super(postsService);
  }

  ngOnInit(): void {
  }


  // afterAddCleanup(result: PostResponseObject): void {
  //   console.log(`Function this:${this}`);
  //   console.log(`Arrow Function:${Object.keys(this)}`);
  //   this.controls.forEach(control => control.setValue(''));
  // }

  afterAddCleanup = (_: PostResponseObject): void => {
    // console.log(`Arrow Function:${this}`);
    // console.log(`Arrow Function:${Object.keys(this)}`);
    this.controls.forEach(control => control.setValue(''));
  }
}
