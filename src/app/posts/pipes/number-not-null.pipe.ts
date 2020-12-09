import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberNotNull'
})
export class NumberNotNullPipe implements PipeTransform {

  transform(value: number | null): number {
    return value || 0;
  }

}
