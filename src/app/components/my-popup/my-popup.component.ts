import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-popup',
  templateUrl: './my-popup.component.html',
  styleUrls: ['./my-popup.component.scss']
})
export class MyPopupComponent implements OnInit {

  showFlag = false;

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.showFlag = true;
    }, 0);
  }

  // 关闭popup
  exit() {
    this.showFlag = false;
    setTimeout(() => {
      this.router.navigate([{outlets: { popup: null }}]);
    }, 600);
  }

}
