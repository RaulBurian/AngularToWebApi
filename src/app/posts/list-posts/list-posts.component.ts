import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';
import {combineLatest, Observable} from 'rxjs';
import {PostResponseObject} from '../contracts/responses/PostResponseObject';
import {map} from 'rxjs/operators';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {EditPostComponent} from '../edit-post/edit-post.component';
import {CreatePostModalComponent} from '../create/create-post-modal/create-post-modal.component';
import {ICollapsed} from '../../shared/models/ICollapsed';

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
  postsNextPage$: Observable<PostResponseObject[]>;
  postsNumber$: Observable<number>;
  isCollapsed: ICollapsed[] = [];

  constructor(private postsService: PostsService,
              private modalService: NgbModal) {
    this.postsNumber$ = this.postsService.getPostsCount();
    this.posts$ = this.postsService.getPostsPaginated(this.pageNumber, this.pageSize);
    this.postsNextPage$ = this.postsService.getPostsPaginated(this.pageNumber + 1, this.pageSize);
    Array.from(Array(this.pageSize)).forEach(nr => this.isCollapsed.push({collapsed: true}));
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  filterPosts(): void {
    this.posts$ = combineLatest([this.posts$, this.postsNextPage$]).pipe(map(values => {
      const [current, next] = values;
      const all: PostResponseObject[] = current.concat(next);
      return all.filter(post => post.name?.includes(this.filterKey)).slice(0, 7);
    }));
  }

  deletePost(postId: string): void {
    this.postsService.deletePost(postId).subscribe(_ => {
      this.posts$ = this.posts$.pipe(map(posts => posts.filter(post => post.id !== postId)));
      this.postsNumber$ = this.postsNumber$.pipe(map(nr => nr--));
    });
  }

  editPost(postId: string, postName: string): void {
    const modalRef: NgbModalRef = this.modalService.open(EditPostComponent);
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

  addPostModal(): void {
    const modalRef: NgbModalRef = this.modalService.open(CreatePostModalComponent, {size: 'lg'});
    modalRef.result.then((addedPost: PostResponseObject) => {
      this.posts$ = this.posts$.pipe(map(posts => {
        posts.unshift(addedPost);
        this.isCollapsed[0].collapsed = true;
        return posts.slice(0, 7);
      }));
      this.postsNumber$ = this.postsNumber$.pipe(map(nr => nr++));
    }).catch(_ => {
    });
  }

  changePage(newPageNumber: number): void {
    this.posts$ = this.postsService.getPostsPaginated(newPageNumber, this.pageSize);
    this.postsNextPage$ = this.postsService.getPostsPaginated(newPageNumber + 1, this.pageSize);
    this.filterPosts();
  }

  toggleCollapse(index: number): void {
    this.isCollapsed[index].collapsed = !this.isCollapsed[index].collapsed;
  }

  private updatePostInCurrentPost(posts: PostResponseObject[], postId: string, postName: string)
    : PostResponseObject[] {
    const post: PostResponseObject | undefined = posts.find(p => p.id === postId);
    if (post) {
      post.name = postName;
    }
    return posts;
  }

}
