import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-body',
  templateUrl: './my-body.component.html',
  styleUrls: ['./my-body.component.scss']
})
export class MyBodyComponent implements OnInit {

  reloadFlag = true;

  constructor() { }

  ngOnInit() {
    // console.log("body初始化")
  }

  reload() {
    this.reloadFlag = false;
    setTimeout(() => {
      this.reloadFlag = true;
    }, 0)
  }

}