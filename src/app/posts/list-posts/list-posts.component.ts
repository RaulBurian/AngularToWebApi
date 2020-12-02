import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';
import {Observable, Subscription} from 'rxjs';
import {PostResponseObject} from '../contracts/PostResponseObject';
import {filter, first, map} from 'rxjs/operators';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit, OnDestroy {

  posts: PostResponseObject[] = [];
  subscriptions: Subscription[] = [];
  pageNumber: number = 1;
  pageSize: number = 7;
  filterKey: string = '';

  constructor(private postsService: PostsService) {
    this.subscriptions.push(
      this.postsService.getPostsPaginated(this.pageNumber, this.pageSize).subscribe(posts => {
        this.posts = posts;
      }));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.subscriptions.push(
        this.postsService.getPostsPaginated(this.pageNumber, this.pageSize)
          .pipe(map(this.filterCurrentPage)).subscribe(posts => {
          this.posts = posts;
        }));
    }
  }

  nextPage() {
    let tempData: PostResponseObject[];
    this.subscriptions.push(
      this.postsService.getPostsPaginated(this.pageNumber + 1, this.pageSize)
        .pipe(map(this.filterCurrentPage)).subscribe(posts => {
        tempData = posts;
        if (tempData.length > 0) {
          this.pageNumber++;
          this.posts = tempData;
        }
      }));
  }

  filterPosts() {
    this.subscriptions.push(
      this.postsService.getPostsPaginated(this.pageNumber, this.pageSize)
        .pipe(map(this.filterCurrentPage)).subscribe(posts => {
        this.posts = posts;
      }));
  }

  //V1 with arrow function
  private filterCurrentPage = (posts: PostResponseObject[]) => {
    // console.log(posts);
    // console.log(this.filterKey);
    const p = posts.filter(post => post.name.includes(this.filterKey));
    console.log(p);
    return p;
  };

  //V2
  private filterCurrentPageV2(posts: PostResponseObject[], filterKey: string) {
    return posts.filter(post => post.name.includes(filterKey));
  }

  deletePost(postId: string) {
    this.postsService.deletePost(postId)
      .pipe(first()).subscribe(_ => {
      this.posts = this.posts.filter(post => post.id != postId);
    });
  }

  editPost() {

  }
}
