import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {PostResponseObject} from '../contracts/responses/PostResponseObject';
import {PostsService} from '../posts.service';
import {ActivatedRoute} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit, OnDestroy {

  post: PostResponseObject;
  postSub: Subscription;

  constructor(private postsService: PostsService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    this.postSub = this.route.paramMap.pipe(mergeMap(paramMap => {
      return this.postsService.getPost(paramMap.get('postId'));
    })).subscribe(p => this.post = p);
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }

  back(): void {
    this.location.back();
  }
}
