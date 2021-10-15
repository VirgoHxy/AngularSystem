import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// 配置
import {
  APP_CONFIG,
  APP_MENU,
  APP_CSS,
  APP_DI_CONFIG,
  APP_DI_MENU,
  APP_DI_CSS
} from './app.config'

// 组件
import { AppComponent } from './app.component';
import { MyHeaderComponent } from './components/my-header/my-header.component';
import { MyBodyComponent } from './components/my-body/my-body.component';
import { MyMenuComponent } from './components/my-menu/my-menu.component';
import { MyMenuItemComponent } from './components/my-menu-item/my-menu-item.component';
import { MyPopupComponent } from './components/my-popup/my-popup.component';
import { MyFormComponent } from './components/my-form/my-form.component';
import { MyFormItemComponent } from './components/my-form-item/my-form-item.component';

// 页面
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { HomePageComponent } from './views/home/homeChildren/home-page/home-page.component';
import { CityComponent } from './views/home/homeChildren/city/city.component';
import { GroupComponent } from './views/home/homeChildren/group/group.component';
import { ProjectComponent } from './views/home/homeChildren/project/project.component';
import { FormComponent } from './views/home/homeChildren/form/form.component';

// 指令
import { HighlightDirective } from './directive/highlight.directive';
import { NotIfDirective } from './directive/not-if.directive';
import { ForbiddenValidatorDirective } from './directive/forbidden-text.directive';

@NgModule({
  declarations: [
    // 主入口
    AppComponent,
    // 组件
    MyHeaderComponent,
    MyBodyComponent,
    MyMenuComponent,
    MyMenuItemComponent,
    MyPopupComponent,
    MyFormComponent,
    MyFormItemComponent,
    // 页面
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    HomePageComponent,
    CityComponent,
    GroupComponent,
    ProjectComponent,
    FormComponent,
    // 指令
    HighlightDirective,
    NotIfDirective,
    ForbiddenValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
    { provide: APP_MENU, useValue: APP_DI_MENU },
    { provide: APP_CSS, useValue: APP_DI_CSS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
