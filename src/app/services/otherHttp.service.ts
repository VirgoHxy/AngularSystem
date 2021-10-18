import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable()
export class OtherHttpService {
  // json 类型 config 的 url
  url = 'assets/config.json';

  constructor(private http: HttpClient) { }

  // observe?: 'body' | 'events' | 'response'
  // responseType?: 'arraybuffer'|'blob'|'json'|'text'

  // jsonp 跨域获取数据
  searchItem(item: string): Observable<any> {
    item = item.trim();

    const url = `${this.url}?${item}`;
    // callback 为回调函数名称
    return this.http.jsonp(url, 'callback').pipe(
      catchError(this.handleError) // then handle the error
    );
  }

  // 回调函数
  callback() {

  }

  // 错误处理
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // 网络错误
      console.error('An error occurred:', error.error);
    } else {
      // 状态码和错误原因
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // 返回错误
    return throwError(
      '出现错误，请稍后重试');
  }

  // 获取 text 文件的内容
  getTextFile(filename: string) {
    return this.http.get(filename, { responseType: 'text' })
      .pipe(
        tap(
          data => {
            console.log(filename, data);
          },
          error => {
            console.error(filename, error);
          }
        )
      );
  }
}