import { InjectionToken } from '@angular/core';

/**
 * 全局配置
 * @param title 应用标题
 * @param accountType 账号类型
 */
export interface AppConfig {
  title: string;
  accountType: AccountType;
}

/**
 * 账号类型
 * @param defineArr 账号类型定义数组
 * @function getTypeText 获取账号类型文字
 */
interface AccountType {
  readonly defineArr: Array<{
    name: string;
    type: number;
    index: number;
    text: string;
  }>;
  getTypeText: Function;
  demo: Function;
}

// 导出配置等
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_DI_CONFIG: AppConfig = {
  title: 'System',
  accountType: {
    defineArr: [
      {
        name: 'admin',
        index: 0,
        type: 0,
        text: '超级管理员',
      },
      {
        name: 'city',
        index: 1,
        type: 1,
        text: '城市管理员',
      },
      {
        name: 'group',
        index: 2,
        type: 2,
        text: '集团管理员',
      },
      {
        name: 'project',
        index: 3,
        type: 3,
        text: '项目管理员',
      },
      {
        name: 'unknow',
        index: 10,
        type: 10,
        text: '未知',
      },
    ],
    getTypeText(type: number): string {
      return this.defineArr[type]?.text || '未知';
    },
    demo(name: string): number {
      let type = this.defineArr.find(ele => name == ele.name)?.type;
      return type != null ? type : 10;
    },
  },
};