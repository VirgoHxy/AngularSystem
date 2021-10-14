import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  textStr = "";

  condition = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log("id:" + this.activatedRoute.snapshot.paramMap.get('id')!);
    console.log("num:" + this.activatedRoute.snapshot.paramMap.get('num')!);
    // this.activatedRoute.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //    of(params.get('id'))
    //   )
    // ).subscribe((id) => {
    //   console.log(id)
    // })
  }
  
  popup() {
    this.router.navigate([{outlets: { popup: ['myPopup'] }}]); 
  }

  canDeactivate() {
    return !this.textStr;
  }

}
