import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

/* service */
// http
import { CityService, InsertOrUpdateOneParam, City } from './city.service';
// msg
import { LoggerService } from '@services/logger.service';
// 格式化时间
import { format } from '@plugins/date.plugin';
import { LoadingService } from '@services/loading.service';

// 表单
import { FormGroup } from '@angular/forms';
import { FormModel } from '@components/shared/my-form/my-form-base';
import { FormService } from './formModel.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  providers: [CityService, FormService],
})
export class CityComponent implements OnInit {
  // 列表
  cityList: Array<City> = [];
  // 条数
  cityCount: Number = 0;
  // 表单组
  form!: FormGroup;
  // 表单模型
  formModel: FormModel;
  // 是否显示
  formShow = false;
  // 新增或者编辑
  formType = 'add';
  // 编辑id
  formId!: number;
  // 查询name
  nameSearch!: string;
  // [propName: string]: any;

  constructor(
    private router: Router,
    private loggerService: LoggerService,
    private loadingService: LoadingService,
    private cityService: CityService,
    private formService: FormService,
  ) {
    this.formModel = this.formService.getFormModel();
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // 这里需要判断一下当前路由，如果不加的话，每次路由结束的时候都会执行这里的方法
        if (event.url === '/home/city') {
          // 在这写需要执行初始化的方法
          console.log('city: 执行初始化')
        }
      });
  }

  ngOnInit() {
    this.getList();
  }

  // 分页获取
  getList() {
    this.loadingService.change(true, '数据加载中,请稍等...');
    this.cityService
      .getList({
        pageIndex: 0,
        pageSize: 10,
        name: this.nameSearch,
      })
      .subscribe((res) => {
        this.loadingService.change(false);
        if (!res.status) {
          this.loggerService.log(res.errMsg || res.message);
          return;
        }
        this.cityList = res.data;
        this.cityCount = res.count;
      });
  }

  // 删除数据
  deleteData(item: City) {
    let flag = window.confirm('确定要删除该数据嘛?');
    if (flag) {
      this.cityService.deleteOne({ id: item.id }).subscribe((res) => {
        if (!res.status) {
          this.loggerService.log(res.errMsg);
          return;
        }
        this.loggerService.log('删除成功');
        this.getList();
      });
    }
  }

  // 插入或者更新
  insertOrUpdateData(data: InsertOrUpdateOneParam) {
    this.cityService.insertOrUpdateOne(data).subscribe((res) => {
      if (!res.status) {
        this.loggerService.log(res.errMsg);
        return;
      }
      this.loggerService.log(`${this.formType == 'add' ? '添加' : '编辑'}成功`);
      this.closeForm();
      this.getList();
    });
  }

  // 表单事件
  formEvent(arg: { name: string; type: string; data?: any }) {
    let { name, type, data } = arg;
    switch (type) {
      case 'formInit':
        this.formInit(data);
        break;
      case 'formBtn':
        this.formBtn(data);
        break;
      case 'closeForm':
        this.closeForm();
        break;
      default:
        break;
    }
  }

  // 初始化
  formInit(form: FormGroup) {
    this.form = form;
  }

  // 按钮
  formBtn(btnName: string) {
    switch (btnName) {
      case 'submit':
        this.submit();
        break;

      default:
        break;
    }
  }

  // 搜索
  searchForm() {
    this.getList();
  }

  // 打开添加表单
  addForm() {
    this.formShow = true;
    this.formType = 'add';
    this.formModel.element.title = '添加城市';
  }

  // 打开编辑表单
  editForm(item: City) {
    this.formShow = true;
    this.formType = 'edit';
    this.formId = item.id;
    this.formModel.element.title = '编辑城市';
    this.form.patchValue({
      name: item.name,
    });
  }

  // 关闭表单
  closeForm() {
    this.formShow = false;
    this.form.reset();
  }

  // 确认按钮
  submit() {
    let rawValue = this.form.getRawValue();
    let data;
    if (this.formType == 'add') {
      data = Object.assign(rawValue, {
        date: format(new Date()),
      });
    } else {
      data = Object.assign(rawValue, {
        id: this.formId,
      });
    }
    this.insertOrUpdateData(data);
  }
}
