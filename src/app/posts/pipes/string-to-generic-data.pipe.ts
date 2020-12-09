import {Pipe, PipeTransform} from '@angular/core';
import {IGenericData} from '../../shared/models/IGenericData';

@Pipe({
  name: 'stringToGenericData'
})
export class StringToGenericDataPipe implements PipeTransform {

  transform(value: string[]): IGenericData<string>[] {
    return value.map(str => {
      return {item: str, modifiable: false};
    });
  }
}
