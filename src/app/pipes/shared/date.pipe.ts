import { Pipe, PipeTransform } from '@angular/core';
import { format } from '@plugins/date.plugin';

// 将时间数据转换为时间字符串
@Pipe({
  name: 'myDate',
})
export class MyDatePipe implements PipeTransform {
  transform = format;
}
