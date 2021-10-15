import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-body',
  templateUrl: './my-body.component.html',
  styleUrls: ['./my-body.component.scss']
})
export class MyBodyComponent implements OnInit {
  reloadFlag: boolean = true; // 重载

  constructor() { }

  // 初始化
  ngOnInit() {
    // console.log("body初始化 只加载一次")
  }

  // 重新加载路由页面
  reload() {
    this.reloadFlag = false;
    setTimeout(() => {
      this.reloadFlag = true;
    }, 0)
  }

}