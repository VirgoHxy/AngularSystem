import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';

export interface Config {
  url: string;
}

@Injectable()
export class ConfigService {
  // json 类型 config 的地址
  configUrl = 'assets/config.json';
  // post 地址
  addOrUpdateUrl = 'config/addOrUpdate';

  constructor(private http: HttpClient, private auth: AuthService) { }

  // observe?: 'body' | 'events' | 'response'
  // responseType?: 'arraybuffer'|'blob'|'json'|'text'

  // 默认是 observe: body responseType: json
  getConfig() {
    return this.http.get<Config>(this.configUrl).pipe(
      // 重试3次
      retry(3),
      // 捕获错误
      catchError(this.handleError)
    );
  }

  // 获取整个 HttpResponse
  getConfigResponse() {
    return this.http.get<Config>(this.configUrl, {
      observe: 'response'
    });
  }

  // 根据 item 获取配置
  searchConfig(key: string): Observable<any> {
    key = key.trim();

    // 添加 url 编码参数
    const options = key ?
      { params: new HttpParams().set('key', key) } : {};

    return this.http.get<any>(this.configUrl, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 添加或编辑配置
  addOrUpdateConfig(config: Config): Observable<Config> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 请求参数类型
        'Content-Type': 'application/json',
        // token
        Authorization: this.auth.getAuthorizationToken()
      })
    };

    // 模拟过期
    if (true) {
      httpOptions.headers = httpOptions.headers.set('Authorization', this.auth.getAuthorizationToken());
    }

    return this.http.post<Config>(this.addOrUpdateUrl, config, httpOptions)
      .pipe(
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