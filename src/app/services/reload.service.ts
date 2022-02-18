import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';

/**
 * 重载服务 全局注册
 */
@Injectable({
  providedIn: 'root',
})
export class ReloadService {
  private behaviorSubject = new BehaviorSubject(true);
  currentReload = this.behaviorSubject.asObservable();

  reload() {
    this.behaviorSubject.next(false);
    setTimeout(() => {
      this.behaviorSubject.next(true);
    }, 0);
  }
}