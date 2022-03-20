import { Pipe, PipeTransform } from '@angular/core';

/**
  * FirstObjValuePipe
  *
  * Pipe to return first value of an object .
  */

@Pipe({
  name: 'firstObjValue'
})
export class FirstObjValuePipe implements PipeTransform {
  /**
    * Accepts an Object and returns the first value of the object.
    *
    * @param {string} value The Object to be transformed.
    * @return {string} Returns the first value of the object.
    */
  transform(value: Object | undefined, ...args: unknown[]): string {
    return Object.values(value || {})[0];
  }

}
