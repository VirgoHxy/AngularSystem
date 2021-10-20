import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';

// 获取列表
export interface GetListParam {
  pageSize: number,
  pageIndex: number,
  name?: string
}

// 获取一项
export interface GetOneParam {
  id?: number,
  name?: string
}

// 插入或编辑一项
export interface InsertOrUpdateOneParam {
  id?: number,
  name: string,
  date: string
}

// 删除一项
export interface DeleteOneParam {
  id: number
}

// 数据模型
export interface City {
  id: number,
  name: string,
  date: string
}

@Injectable()
export class CityService {
  // 增删改查地址
  findListUrl = 'cities/findList';
  findOneByPostUrl = 'cities/findOneByPost';
  insertOrUpdateUrl = 'cities/insertOrUpdate';
  deleteUrl = 'cities/delete';

  constructor(private http: HttpClient, private auth: AuthService) { }

  // observe?: 'body' | 'events' | 'response'
  // responseType?: 'arraybuffer'|'blob'|'json'|'text'

  // 获取列表
  getList(param: GetListParam) {
    const httpOptions = {
      headers: new HttpHeaders({
        // 请求参数类型
        'Content-Type': 'application/json',
        // token
        Authorization: this.auth.getAuthorizationToken()
      })
    };
    // 默认是 observe: body responseType: json
    return this.http.post<any>(this.findListUrl, param, httpOptions).pipe(
      // 重试3次
      retry(3),
      // 捕获错误
      catchError(this.handleError)
    );
  }

  // 获取一项
  getOne(param: GetOneParam) {
    const httpOptions = {
      headers: new HttpHeaders({
        // 请求参数类型
        'Content-Type': 'application/json',
        // token
        Authorization: this.auth.getAuthorizationToken()
      })
    };
    return this.http.post<any>(this.findOneByPostUrl, param, httpOptions).pipe(
      // 重试3次
      retry(3),
      // 捕获错误
      catchError(this.handleError)
    );
  }

  // 插入或编辑一项
  insertOrUpdateOne(param: InsertOrUpdateOneParam) {
    const httpOptions = {
      headers: new HttpHeaders({
        // 请求参数类型
        'Content-Type': 'application/json',
        // token
        Authorization: this.auth.getAuthorizationToken()
      })
    };
    return this.http.post<any>(this.insertOrUpdateUrl, param, httpOptions).pipe(
      // 重试3次
      retry(3),
      // 捕获错误
      catchError(this.handleError)
    );
  }

  // 删除一项
  deleteOne(param: DeleteOneParam) {
    const httpOptions = {
      headers: new HttpHeaders({
        // 请求参数类型
        'Content-Type': 'application/json',
        // token
        Authorization: this.auth.getAuthorizationToken()
      })
    };
    return this.http.post<any>(this.deleteUrl, param, httpOptions).pipe(
      // 重试3次
      retry(3),
      // 捕获错误
      catchError(this.handleError)
    );
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
}