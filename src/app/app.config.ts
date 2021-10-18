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
 * 账号数据
 * @param type 账号类型
 * @param name 账号名称
 */
export interface AccountData {
  type: number;
  name: string;
}

/**
 * 账号类型
 * @param defineArr 账号类型定义数组
 * @function getTypeText 获取账号类型文字
 */
interface AccountType {
  defineArr: Array<{
    name: string;
    type: number;
    text: string;
  }>;
  getTypeText: Function;
}

/**
 * 侧边栏对象
 * @param menuList 侧边栏数组
 */
export interface AppMenu {
  menuList: Array<Menu>;
}

/**
 * 侧边栏对象
 * @param name 路由名称
 * @param text 文字
 * @param active 是否激活
 * @param hide 是否隐藏
 */
export interface Menu {
  name: string;
  text: string;
  active?: boolean;
  hide?: boolean;
}

/**
 * 全局css
 * @param primaryColor 基础颜色
 */
export interface AppCss {
  primaryColor: string;
}

// 导出配置等
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_MENU = new InjectionToken<AppMenu>('app.menu');

export const APP_CSS = new InjectionToken<AppCss>('app.css');

export const APP_DI_CONFIG: AppConfig = {
  title: 'System',
  accountType: {
    defineArr: [
      {
        name: 'admin',
        type: 0,
        text: '超级管理员',
      },
    ],
    getTypeText(type: number): string {
      return this.defineArr[type].text;
    },
  },
};

export const APP_DI_MENU: AppMenu = {
  menuList: [
    {
      name: 'homePage',
      text: '首页',
    },
    {
      name: 'city',
      text: '城市管理',
    },
    {
      name: 'group',
      text: '集团管理',
    },
    {
      name: 'project',
      text: '项目管理',
    },
    {
      name: 'form',
      text: '表单管理',
    },
  ],
};

export const APP_DI_CSS: AppCss = {
  primaryColor: '#409eff',
};
