import { Injectable } from '@angular/core';

// 日志服务 全局注册
@Injectable({
  providedIn: 'root'
})

export class LoggerService {
  logs: any[] = []; // 存储日志信息

  log(message: any, ...args: any[]) {
    this.logs.push({
      message,
      args
    });
    console.log(message, ...args);
  }
}