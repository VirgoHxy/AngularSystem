import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// http
import { CityService, InsertOrUpdateOneParam, City } from './city.service';
// msg
import { LoggerService } from '@app/services/logger.service';
// 格式化时间
import { format } from '@app/services/date.plugin';

// 表单
import { FormGroup } from '@angular/forms';
import { FormModel } from '@components/my-form/my-form-base';
import { FormService } from './formModel.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  providers: [CityService, LoggerService, FormService],
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
  // 这个用来执行 run 传来的方法
  [propName: string]: any;

  constructor(
    private cityService: CityService,
    private loggerService: LoggerService,
    private formService: FormService,
    private router: Router
  ) {
    this.formModel = formService.getFormModel();
  }

  ngOnInit() {
    this.getList();
  }

  // 分页获取
  getList() {
    this.cityService
      .getList({
        pageIndex: 0,
        pageSize: 10,
        name: this.nameSearch,
      })
      .subscribe((res) => {
        if (!res.status) {
          this.loggerService.log(res.errMsg);
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
      case 'run':
        if (data && data.name) {
          this[data.name] && this[data.name](data.data);
        }
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
