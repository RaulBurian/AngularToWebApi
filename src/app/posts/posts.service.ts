import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostResponseObject} from './contracts/responses/PostResponseObject';
import {Routes} from '../shared/routes/routes';
import {first, map} from 'rxjs/operators';
import {PostResponse} from './contracts/responses/PostResponse';
import {CreatePostRequest} from './contracts/requests/CreatePostRequest';
import {GetCountResponse} from './contracts/responses/GetCountResponse';
import {PostCreateResponse} from './contracts/responses/PostCreateResponse';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient) {

  }

  getPosts(): Observable<PostResponseObject[]> {
    return this.httpClient.get<PostResponse>(Routes.Post.GETALL)
      .pipe(map(response => {
        return response.data;
      }));
  }

  getPostsPaginated(pageNumber: number, pageSize: number): Observable<PostResponseObject[]> {
    return this.httpClient.get<PostResponse>(Routes.Post.GETPAGINATED,
      {
        params: {
          pageSize: pageSize.toString(),
          pageNumber: pageNumber.toString()
        }
      })
      .pipe(map(response => response.data));
  }

  deletePost(postId: string): Observable<null> {
    return this.httpClient.delete<null>(`${Routes.Post.DELETE}/${postId}`).pipe(first());
  }

  updatePost(postId: string, newPostName: string): Observable<null> {
    return this.httpClient.put<null>(`${Routes.Post.UPDATE}/${postId}`, {name: newPostName}).pipe(first());
  }

  addPost(request: CreatePostRequest): Observable<PostResponseObject> {
    return this.httpClient.post<PostCreateResponse>(Routes.Post.ADD, request).pipe(first(), map(response => response.data));
  }

  getPostsCount(): Observable<number> {
    return this.httpClient.get<GetCountResponse>(Routes.Post.COUNT).pipe(first(), map(response => response.data));
  }

  getRecommended(key: string, numberOfRec: number = 10): Observable<PostResponseObject[]> {
    return this.httpClient.get<PostResponse>(Routes.Post.RECOMMENDED, {
      params: {
        searchTerm: key || '',
        numberOfRec: numberOfRec.toString()
      }
    }).pipe(map(response => response.data));
  }
}
