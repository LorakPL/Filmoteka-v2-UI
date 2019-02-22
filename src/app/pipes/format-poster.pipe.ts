import { Pipe, PipeTransform } from '@angular/core';
import * as constants from '../model/constants';

@Pipe({
  name: 'formatPoster'
})
export class FormatPosterPipe implements PipeTransform {

  transform(poster: string): string {
    return constants.poster_url + poster;
  }

}
