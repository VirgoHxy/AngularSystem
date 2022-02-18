import { Component, Inject, OnInit } from '@angular/core';
import {
  GuardsCheckEnd,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';

import { APP_CONFIG, AppConfig } from '@app/app.config';
import { LoadingService } from '@services/loading.service';
import { getExpireStorage } from '@plugins/storage.plugin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // 全局配置
  appConfig: AppConfig;
  // 加载
  loading: boolean = false;
  loadingMsg: string = '请稍等...';

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    @Inject(APP_CONFIG) appConfig: AppConfig
  ) {
    this.appConfig = appConfig;

    this.loadingService.currentLoading.subscribe(
      ({ flag, msg }: { flag: boolean; msg?: string }) => {
        setTimeout(() => {
          this.loading = flag;
          this.loadingMsg = msg || '请稍等...';
        }, flag ? 0: 600)
      }
    );

    this.router.events
      .pipe(filter((event) => event instanceof RouterEvent))
      .subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
          this.loadingMsg = '模块加载中,请稍等...';
        } else if (event instanceof NavigationEnd) {
          this.loading = false;
        } else if (event instanceof GuardsCheckEnd) {
          this.loading = false;
        }
      });
  }

  ngOnInit(): void {
    // 读取数据
    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--primaryColor').trim();
    console.log(primaryColor);
    // 改写数据
    // document.documentElement.style.setProperty('--primaryColor', '#42A948');
    // document.documentElement.style.setProperty('--deepPrimaryColor', '#27972d');

    let theme = getExpireStorage(localStorage, 'theme');
    if (theme == 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    if (this.appConfig.title) {
      document.title = this.appConfig.title;
    }
  }
}
