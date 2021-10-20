import { Pipe, PipeTransform } from '@angular/core';
import { format } from '@app/services/date.plugin'

// 将时间数据转换为时间字符串
@Pipe({
  name: 'myDate'
})
export class MyDatePipe implements PipeTransform {

  transform(value: object | string | number, formatStr?: string): string {
    return format(value, formatStr);
  }

}
