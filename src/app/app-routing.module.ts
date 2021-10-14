import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/authGuard.service'
import { SaveGuard } from './services/saveGuard.service'

import { MyPopupComponent } from './components/my-popup/my-popup.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { HomePageComponent } from './views/home/homeChildren/home-page/home-page.component';
import { CityComponent } from './views/home/homeChildren/city/city.component';
import { GroupComponent } from './views/home/homeChildren/group/group.component';
import { ProjectComponent } from './views/home/homeChildren/project/project.component';

// 定义路由 建议路由分别模块定义(为什么要剥离: 使用异步路由懒加载来优化加载速度)
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    // canLoad未生效
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'homePage',
        component: HomePageComponent,
        canDeactivate: [SaveGuard]
      },
      {
        path: 'city',
        component: CityComponent
      },
      {
        path: 'group',
        component: GroupComponent
      },
      {
        path: 'project',
        component: ProjectComponent
      },
      { path: '', pathMatch: 'full', redirectTo: 'homePage' }
    ]
  },
  {
    path: 'myPopup',
    component: MyPopupComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', component: NotFoundComponent }
];


// RouterModule导入路由 导出RouterModule
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // 开启路由导航发生时的所有事件
    // enableTracing: true,
    // hash或是history
    // useHash: true
  })],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }

