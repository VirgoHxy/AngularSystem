import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  // input 的值
  text: string = "";
  // 条件
  condition: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // 获取参数
    console.log("id:" + this.activatedRoute.snapshot.paramMap.get('id')!);
    console.log("num:" + this.activatedRoute.snapshot.paramMap.get('num')!);
    // 获取参数
    // this.activatedRoute.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //    of(params.get('id'))
    //   )
    // ).subscribe((id) => {
    //   console.log(id)
    // })
  }
  
  // popup 多路由出口
  popup() {
    this.router.navigate([{outlets: { popup: ['myPopup'] }}]); 
  }

  // 是否可离开
  canDeactivate() {
    return !this.text;
  }

}
