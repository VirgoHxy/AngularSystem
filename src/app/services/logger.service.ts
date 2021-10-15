import { Injectable } from '@angular/core';

// 日志服务 全局注册
@Injectable({
  providedIn: 'root'
})

export class LoggerService {
  logs: string[] = []; // 存储日志信息

  log(message: string) {
    this.logs.push(message);
    console.log(message);
  }
}