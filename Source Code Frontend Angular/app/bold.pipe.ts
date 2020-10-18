import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'bold'
})
export class BoldPipe implements PipeTransform {

  transform(value, args: any): unknown {
    let a = args.split(' ');
    _.uniq(a);
    let data;
    for (let i = 0; i < a.length; i++) {
      if (data && a[i] != 'strong') {
        data = data.replace(a[i].toLowerCase(), '<strong>' + a[i].toLowerCase() + '</strong>');
      } else if (a[i] != 'strong') {
        data = value.replace(a[i].toLowerCase(), '<strong>' + a[i].toLowerCase() + '</strong>');
      }

    }
    return data;
  }

}
