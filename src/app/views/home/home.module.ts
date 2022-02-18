import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* 模块 */
// 路由
import { HomeRoutingModule } from './home-routing.module';
// 共享
import { SharedModule } from '@app/shared.module';

/* 指令 */
// 属性指令
import { HighlightDirective } from '@directives/highlight.directive';
// 结构指令
import { NotIfDirective } from '@directives/not-if.directive';

/* 页面 */
// 入口
import { HomeComponent } from './home.component';
import { HomePageComponent } from '@views/home/homeChildren/home-page/home-page.component';
import { CityComponent } from '@views/home/homeChildren/city/city.component';
import { GroupComponent } from '@views/home/homeChildren/group/group.component';
import { ProjectComponent } from '@views/home/homeChildren/project/project.component';
import { FormComponent } from '@views/home/homeChildren/form/form.component';

// 组件
import { MyBodyComponent } from '@components/my-body/my-body.component';
import { MyHeaderComponent } from '@components/my-header/my-header.component';
import { MyMenuComponent } from '@components/my-menu/my-menu.component';
import { MyMenuItemComponent } from '@components/my-menu-item/my-menu-item.component';

@NgModule({
  imports: [
    // 路由
    HomeRoutingModule,
    CommonModule,
    SharedModule,
  ],
  declarations: [
    // 指令
    HighlightDirective,
    NotIfDirective,
    // 组件
    MyHeaderComponent,
    MyBodyComponent,
    MyMenuComponent,
    MyMenuItemComponent,
    /* 页面 */
    // 入口
    HomeComponent,
    HomePageComponent,
    CityComponent,
    GroupComponent,
    ProjectComponent,
    FormComponent,
  ],
  bootstrap: [HomeComponent],
})
export class HomeModule {}
