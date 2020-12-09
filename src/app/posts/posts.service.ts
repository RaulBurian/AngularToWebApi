import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostResponseObject} from './contracts/PostResponseObject';
import {Routes} from '../shared/routes/routes';
import {map} from 'rxjs/operators';
import {PostResponse} from './contracts/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class PostsService {


  constructor(private httpClient:HttpClient) {

  }

  getPosts(): Observable<PostResponseObject[]>{
    return this.httpClient.get<PostResponse>(Routes.Post.GETALL)
      .pipe(map(response=>{
        return response.data;
      }));
  }
}
