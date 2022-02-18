import { NgModule } from '@angular/core';

// 共享module
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// 共享组件
import { MyPopupComponent } from '@components/shared/my-popup/my-popup.component';
import { MyFormComponent } from '@components/shared/my-form/my-form.component';
import { MyFormItemComponent } from '@components/shared/my-form-item/my-form-item.component';

/* 共享指令 */
// 属性指令
import { ShowDirective } from '@directives/shared/show.directive';
// 结构指令
import { ForbiddenValidatorDirective } from '@directives/shared/forbidden-text.directive';

// 共享管道
import { MyDatePipe } from '@pipes/shared/date.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    MyPopupComponent,
    MyFormComponent,
    MyFormItemComponent,
    ShowDirective,
    ForbiddenValidatorDirective,
    MyDatePipe,
  ],
  exports: [
    // 导出所有模块
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MyPopupComponent,
    MyFormComponent,
    MyFormItemComponent,
    ShowDirective,
    ForbiddenValidatorDirective,
    MyDatePipe,
  ],
})
export class SharedModule {}
