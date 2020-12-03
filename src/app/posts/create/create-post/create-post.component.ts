import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../posts.service';
import {AbstractCreateComponent} from '../abstract-create/abstract-create.component';
import {PostResponseObject} from '../../contracts/PostResponseObject';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent extends AbstractCreateComponent implements OnInit {

  constructor(postsService: PostsService) {
    super(postsService);
  }

  ngOnInit(): void {
  }

  afterAddCleanup = (result: PostResponseObject): void => {
    this.controls.forEach(control => control.setValue(''));
  };
}
