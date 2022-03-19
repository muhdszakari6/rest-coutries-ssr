import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstObjValue'
})
export class FirstObjValuePipe implements PipeTransform {

  transform(value: Object | undefined, ...args: unknown[]): string {
    return Object.values(value || {})[0];
  }

}
