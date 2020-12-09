import {Pipe, PipeTransform} from '@angular/core';
import {PostResponseObject} from '../contracts/responses/PostResponseObject';
import {IGenericData} from '../../shared/models/IGenericData';

@Pipe({
  name: 'toListItem'
})
export class ToListItemPipe implements PipeTransform {

  transform(value: PostResponseObject[]): IGenericData<PostResponseObject>[] {
    return value?.map(post => {
      return {item: post, modifiable: post.canEdit};
    }) || [];
  }
}
