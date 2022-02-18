import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaveGuard } from '@services/saveGuard.service'

import { HomePageComponent } from '@views/home/homeChildren/home-page/home-page.component';
import { CityComponent } from '@views/home/homeChildren/city/city.component';
import { GroupComponent } from '@views/home/homeChildren/group/group.component';
import { ProjectComponent } from '@views/home/homeChildren/project/project.component';
import { FormComponent } from '@views/home/homeChildren/form/form.component';

// 定义路由 建议路由分别模块定义(为什么要剥离: 使用异步路由懒加载来优化加载速度)
const routes: Routes = [
  {
    path: 'homePage',
    component: HomePageComponent,
    canDeactivate: [SaveGuard]
  },
  {
    path: 'city',
    component: CityComponent,
    // 不重复init
    data: {keep: true}
  },
  {
    path: 'group',
    component: GroupComponent
  },
  {
    path: 'project',
    component: ProjectComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  { path: '', pathMatch: 'full', redirectTo: 'homePage' }
];


// RouterModule导入路由 导出RouterModule
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SaveGuard]
})

export class HomeRoutingModule { }

