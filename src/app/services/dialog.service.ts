import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * 弹窗服务 全局注册
 */
@Injectable({
  providedIn: 'root',
})
export class DialogService {

  // 弹窗
  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Is it OK?');

    return of(confirmation);
  }
}