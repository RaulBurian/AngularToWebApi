import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorExists'
})
export class ErrorExistsPipe implements PipeTransform {

  transform(value: Error | null): boolean {
    return value!=null;
  }

}
