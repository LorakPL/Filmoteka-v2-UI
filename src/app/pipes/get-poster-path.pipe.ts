import { Pipe, PipeTransform } from '@angular/core';
import * as constants from '../model/constants';

@Pipe({
  name: 'getPosterPath'
})
export class GetPosterPathPipe implements PipeTransform {

  transform(value: string): string {
    return constants.poster_url + value;
  }

}
