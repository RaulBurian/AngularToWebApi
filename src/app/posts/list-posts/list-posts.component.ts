import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';
import {Observable, Subscription} from 'rxjs';
import {PostResponseObject} from '../contracts/PostResponseObject';
import {filter, first, map, takeWhile} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditPostComponent} from '../edit-post/edit-post.component';
import {CreatePostModalComponent} from '../create-post-modal/create-post-modal.component';

interface ICollapsed {
  collapsed: boolean;
}

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit, OnDestroy {

  pageNumber: number = 1;
  pageSize: number = 7;
  filterKey: string = '';
  posts$: Observable<PostResponseObject[]>;
  isCollapsed: ICollapsed[] = [];

  constructor(private postsService: PostsService,
              private modalService: NgbModal) {
    this.posts$ = this.postsService.getPostsPaginated(this.pageNumber, this.pageSize);
    Array.from(Array(this.pageSize)).forEach(nr => this.isCollapsed.push({collapsed: true}));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.posts$ = this.postsService.getPostsPaginated(this.pageNumber, this.pageSize)
        .pipe(map(this.filterCurrentPage));
    }
  }

  nextPage() {
    this.pageNumber++;
    this.postsService.getPostsPaginated(this.pageNumber, this.pageSize)
      .pipe(first(), map(posts => {
        if (posts.length > 0) {
          this.posts$ = this.postsService.getPostsPaginated(this.pageNumber, this.pageSize)
            .pipe(map(this.filterCurrentPage));
          this.isCollapsed.forEach(item => item.collapsed = true);
        } else {
          this.pageNumber--;
        }
        return posts;
      })).subscribe(_ => {
    });
  }

  filterPosts() {
    this.posts$ = this.posts$.pipe(map(posts => this.filterCurrentPageV2(posts)));
  }

  private filterCurrentPage = (posts: PostResponseObject[]) => {
    return posts.filter(post => post.name.includes(this.filterKey));
  };

  private filterCurrentPageV2(posts: PostResponseObject[]) {
    return posts.filter(post => post.name.includes(this.filterKey));
  }

  deletePost(postId: string) {
    this.postsService.deletePost(postId).subscribe(_ => {
      this.posts$ = this.posts$.pipe(map(posts => posts.filter(post => post.id != postId)));
    });
  }

  editPost(postId: string, postName: string) {
    const modalRef = this.modalService.open(EditPostComponent);
    modalRef.componentInstance.postName = postName;
    modalRef.componentInstance.postId = postId;
    modalRef.result.then(result => {
      this.posts$ = this.posts$.pipe(map(posts => {
        return this.updatePostInCurrentPost(posts, postId, result.postName);
      }));
    })
      .catch(_ => {
      });
  }

  addPostModal() {
    const modalRef = this.modalService.open(CreatePostModalComponent, {size: 'lg'});
    modalRef.result.then((addedPost) => {
      this.posts$ = this.posts$.pipe(map(posts => {
        posts.unshift(addedPost.data);
        this.isCollapsed[0].collapsed = true;
        return posts.slice(0, 7);
      }));
    }).catch(_ => {
    });
  }

  private updatePostInCurrentPost(posts: PostResponseObject[], postId: string, postName: string) {
    let post = posts.find(post => post.id == postId);
    if (post) {
      post.name = postName;
    }
    return posts;
  }

  toggleCollapse(index: number) {
    // console.log(index);
    this.isCollapsed[index].collapsed = !this.isCollapsed[index].collapsed;
  }
}
