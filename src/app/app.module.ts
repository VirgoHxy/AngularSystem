import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
  APP_CONFIG,
  APP_MENU,
  APP_CSS,
  APP_DI_CONFIG,
  APP_DI_MENU,
  APP_DI_CSS
} from './app.config'

import { AppComponent } from './app.component';
import { MyHeaderComponent } from './components/my-header/my-header.component';
import { MyBodyComponent } from './components/my-body/my-body.component';
import { MyMenuComponent } from './components/my-menu/my-menu.component';
import { MyMenuItemComponent } from './components/my-menu-item/my-menu-item.component';
import { MyPopupComponent } from './components/my-popup/my-popup.component';

import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { HomePageComponent } from './views/home/homeChildren/home-page/home-page.component';
import { CityComponent } from './views/home/homeChildren/city/city.component';
import { GroupComponent } from './views/home/homeChildren/group/group.component';
import { ProjectComponent } from './views/home/homeChildren/project/project.component';
import { HighlightDirective } from './directive/highlight.directive';
import { NotIfDirective } from './directive/not-if.directive';
import { ForbiddenValidatorDirective } from './directive/forbidden-text.directive';

@NgModule({
  declarations: [
    AppComponent,
    // 组件
    MyHeaderComponent,
    MyBodyComponent,
    MyMenuComponent,
    MyMenuItemComponent,
    MyPopupComponent,
    // 页面
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    HomePageComponent,
    CityComponent,
    GroupComponent,
    ProjectComponent,
    // 指令
    HighlightDirective,
    NotIfDirective,
    ForbiddenValidatorDirective,
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
