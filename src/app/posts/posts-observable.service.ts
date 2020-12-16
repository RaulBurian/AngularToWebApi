import {Injectable} from '@angular/core';
import {PostsService} from './posts.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {PostResponseObject} from './contracts/responses/PostResponseObject';

@Injectable({
  providedIn: 'root'
})
export class PostsObservableService {

  private currentPosts: BehaviorSubject<PostResponseObject[]> = new BehaviorSubject<PostResponseObject[]>([]);
  private currentPostsNumber: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public currentPosts$: Observable<PostResponseObject[]> = this.currentPosts.asObservable();
  public currentPostsNumber$: Observable<number> = this.currentPostsNumber.asObservable();

  constructor(private postsService: PostsService) {
  }

  setPosts(posts: PostResponseObject[]): void {
    this.currentPosts.next(posts);
    this.currentPostsNumber.next(posts.length);
  }

  getCurrentPosts(): PostResponseObject[] {
    return this.currentPosts.value;
  }

  addPost(post: PostResponseObject): void {
    this.currentPosts.next([post, ...this.currentPosts.value].slice(0, this.currentPostsNumber.value));
  }

  removePost(postId: string): void {
    let currentItems = this.currentPosts.value;
    currentItems = currentItems.filter(post => post.id !== postId);
    this.currentPosts.next(currentItems);
    this.currentPostsNumber.next(currentItems.length);
  }

  editPost(postId: string, postName: string): void {
    const currentItems = this.currentPosts.value;
    const itemToEdit: PostResponseObject = currentItems.find(post => post.id === postId);
    itemToEdit.name = postName;
  }
}
