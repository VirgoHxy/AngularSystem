import { InjectionToken } from '@angular/core';

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

// 导出配置等
export const APP_MENU = new InjectionToken<AppMenu>('app.menu');

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