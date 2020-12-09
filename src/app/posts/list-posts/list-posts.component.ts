import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';
import {Observable} from 'rxjs';
import {PostResponseObject} from '../contracts/responses/PostResponseObject';
import {map} from 'rxjs/operators';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {EditPostComponent} from '../edit-post/edit-post.component';
import {CreatePostModalComponent} from '../create/create-post-modal/create-post-modal.component';
import {ActivatedRoute, Router} from '@angular/router';

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
  posts$: Observable<PostResponseObject[]>;
  postsNumber$: Observable<number>;
  isCollapsed: ICollapsed[] = [];

  constructor(private postsService: PostsService,
              private modalService: NgbModal,
              private router: Router) {
    this.postsNumber$ = this.postsService.getPostsCount();
    this.posts$ = this.postsService.getPostsPaginated(this.pageNumber, this.pageSize);
    Array.from(Array(this.pageSize)).forEach(nr => this.isCollapsed.push({collapsed: true}));
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  changePage(newPageNumber: number): void {
    this.posts$ = this.postsService.getPostsPaginated(newPageNumber, this.pageSize);
  }

  filterPost(post: PostResponseObject, key: string): boolean {
    return post.name.includes(key);
  }

  edit = (post: PostResponseObject): void => {
    const modalRef: NgbModalRef = this.modalService.open(EditPostComponent);
    modalRef.componentInstance.postName = post.name;
    modalRef.componentInstance.postId = post.id;
    modalRef.result.then(result => {
      this.posts$ = this.posts$.pipe(map(posts => {
        return this.updatePostInCurrentPost(posts, post.id, result.postName);
      }));
    })
      .catch(_ => {
      });
  }

  delete = (post: PostResponseObject): void => {
    this.postsService.deletePost(post.id).subscribe(_ => {
      this.posts$ = this.posts$.pipe(map(posts => posts.filter(pst => pst.id !== post.id)));
    });
  }

  addPostModal = (): void => {
    const modalRef: NgbModalRef = this.modalService.open(CreatePostModalComponent, {size: 'lg'});
    modalRef.result.then((addedPost: PostResponseObject) => {
      this.posts$ = this.posts$.pipe(map(posts => {
        posts = posts.filter(post => post.id !== addedPost.id);
        posts.unshift(addedPost);
        this.isCollapsed[0].collapsed = true;
        return posts.slice(0, 7);
      }));
    }).catch(_ => {
    });
  }

  click = (post: PostResponseObject): void => {
    this.router.navigate(['/posts/detail', post.id]);
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
