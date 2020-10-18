import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe implements PipeTransform {

  transform(value, args: []): unknown {
    return value.substring(0, 100) + '...';
  }

}
