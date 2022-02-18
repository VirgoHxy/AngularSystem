import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { LoggerService } from '../logger.service';
import configJson from '@assets/config.json';

// 记录请求
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private logger: LoggerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;

    // 发给下个拦截器
    return next.handle(req).pipe(
      tap(
        // 成功调用
        () => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
        // 错误调用
        (error) => (ok = 'failed')
      ),
      // 失败或者成功都调用
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
        configJson.debug && this.logger.log(msg);
      })
    );
  }
}
