import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TagResponseObject} from './contracts/responses/TagResponseObject';
import {Routes} from '../shared/routes/routes';
import {first, map} from 'rxjs/operators';
import {TagResponse} from './contracts/responses/TagResponse';
import {TagsCountResponse} from './contracts/responses/TagsCountResponse';
import {AddTagRequest} from './contracts/requests/AddTagRequest';
import {TagCreateResponse} from './contracts/responses/TagCreateResponse';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private httpclient: HttpClient) {

  }

  getALLTags(): Observable<TagResponseObject[]> {
    return this.httpclient.get<TagResponse>(Routes.Tags.GETALL).pipe(first(), map(response => response.data));
  }

  getTagsCount(): Observable<number> {
    return this.httpclient.get<TagsCountResponse>(Routes.Tags.COUNT).pipe(first(), map(response => response.data));
  }

  getTagsPaginated(pageNumber: number, pageSize: number): Observable<TagResponseObject[]> {
    return this.httpclient.get<TagResponse>(Routes.Tags.GETPAGINATED, {
      params: {
        pageSize: pageSize.toString(),
        pageNumber: pageNumber.toString()
      }
    })
      .pipe(first(), map(response => response.data));
  }

  deleteTag(tagName: string) {
    return this.httpclient.delete(`${Routes.Tags.DELETE}/${tagName}`).pipe(first());
  }

  addTags(tagRequest: AddTagRequest): Observable<TagResponseObject> {
    return this.httpclient.post<TagCreateResponse>(Routes.Tags.ADD, tagRequest)
      .pipe(first(), map(response => response.data));
  }
}
