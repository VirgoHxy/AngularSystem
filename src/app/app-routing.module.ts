import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@services/authGuard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

import { MyPopupComponent } from '@components/shared/my-popup/my-popup.component';
import { LoginComponent } from '@views/login/login.component';
import { HomeComponent } from '@views/home/home.component';
import { NotFoundComponent } from '@views/not-found/not-found.component';

// 定义路由 建议路由分别模块定义(为什么要剥离: 使用异步路由懒加载来优化加载速度)
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    // canLoad未生效
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('@views/home/home.module').then(
        (mod) => mod.HomeModule
      )
  },
  {
    path: 'myPopup',
    component: MyPopupComponent,
    outlet: 'popup',
    canActivate: [AuthGuard],
    // 不预加载
    data: {preload: false}
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', component: NotFoundComponent },
];

// RouterModule导入路由 导出RouterModule
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // 开启路由导航发生时的所有事件
      // enableTracing: true,
      // hash或是history
      // useHash: true
      // preload为false不预加载 默认预加载
      preloadingStrategy: SelectivePreloadingStrategy,
    }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard, SelectivePreloadingStrategy],
})
export class AppRoutingModule {}
