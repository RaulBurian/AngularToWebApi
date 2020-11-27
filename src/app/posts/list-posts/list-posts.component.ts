import { Component, OnInit } from '@angular/core';
import {PostsService} from '../posts.service';
import {Observable} from 'rxjs';
import {PostResponseObject} from '../contracts/PostResponseObject';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {

  posts$: Observable<PostResponseObject[]>;

  constructor(private postsService:PostsService) {
    this.posts$=this.postsService.getPosts();
    this.postsService.getPosts().subscribe(console.log);
  }

  ngOnInit(): void {
  }


}
