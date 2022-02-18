import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';

/**
 * 加载服务 全局注册
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private behaviorSubject = new BehaviorSubject({flag: false, msg: ''});
  currentLoading = this.behaviorSubject.asObservable();

  change(flag: boolean, msg?: string) {
    this.behaviorSubject.next({flag, msg:  msg || ''});
  }
}