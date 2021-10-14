import { Injectable } from '@angular/core';

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