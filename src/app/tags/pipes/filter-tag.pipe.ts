import {Pipe, PipeTransform} from '@angular/core';
import {TagResponseObject} from '../contracts/responses/TagResponseObject';

@Pipe({
  name: 'filterTag',
})
export class FilterTagPipe implements PipeTransform {

  transform(value: TagResponseObject[] | null, filterKey: string): TagResponseObject[] {
    return value?.filter(post => post.name?.includes(filterKey)) || [];
  }

}
