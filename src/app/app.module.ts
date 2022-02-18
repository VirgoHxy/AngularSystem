
import { NgModule } from '@angular/core';

// 这两个模块不要共享 只引用一次即可
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

/* 模块 */
// 路由
import { AppRoutingModule } from './app-routing.module';
import { RouteReuseStrategy } from '@angular/router';
import { ReuseStrategy } from './reuse-strategy';
// store
import { StoreModule, USER_PROVIDED_META_REDUCERS } from '@ngrx/store';
import { loginReducer } from '@stores/login/reducer';
import { getMetaReducers } from './stores';
// 共享
import { SharedModule } from './shared.module';

// 配置
import {
  APP_CONFIG,
  APP_DI_CONFIG,
} from './app.config';

/* 页面 */
// 主入口
import { AppComponent } from './app.component';
import { LoginComponent } from '@views/login/login.component';
import { NotFoundComponent } from '@views/not-found/not-found.component';

/* 服务 */
// 拦截器
import { httpInterceptorProviders } from '@services/http-interceptors/index';
import { LoggerService } from '@services/logger.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  	StoreModule.forRoot({ login: loginReducer }),
    SharedModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
  ],
  providers: [
    { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
    { provide: RouteReuseStrategy, useClass: ReuseStrategy },
    {
      provide: USER_PROVIDED_META_REDUCERS,
      deps: [LoggerService],
      useFactory: getMetaReducers
    },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
