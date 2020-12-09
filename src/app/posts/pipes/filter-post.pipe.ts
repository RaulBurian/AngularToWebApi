import {Pipe, PipeTransform} from '@angular/core';
import {PostResponseObject} from '../contracts/responses/PostResponseObject';

@Pipe({
  name: 'filterPost'
})
export class FilterPostPipe implements PipeTransform {

  transform(value: PostResponseObject[] | null, nextPage: PostResponseObject[] | null, filterKey: string): PostResponseObject[] {
    const allValues: PostResponseObject[] = value?.concat(nextPage || []) || [];
    return allValues.filter(post => post.name?.includes(filterKey)).slice(0, 7);
  }

}
