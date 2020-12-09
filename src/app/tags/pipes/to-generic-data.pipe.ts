import {Pipe, PipeTransform} from '@angular/core';
import {TagResponseObject} from '../contracts/responses/TagResponseObject';
import {IGenericData} from '../../shared/models/IGenericData';

@Pipe({
  name: 'toGenericData'
})
export class ToGenericDataPipe implements PipeTransform {

  transform(value: TagResponseObject[]): IGenericData<TagResponseObject>[] {
    return value?.map(tag => {
      return {item: tag, modifiable: true};
    }) || [];
  }

}
