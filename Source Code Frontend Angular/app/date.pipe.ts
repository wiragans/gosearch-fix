import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value, args: []): unknown {
    return moment(moment.unix(value).format("YYYY MM DD kk mm ss"), 'YYYY MM DD kk mm ss').fromNow();
  }

}
