import { InjectionToken } from "@angular/core";

export interface AppConfig {
  title: string;
  accountType: AccountType;
}

export interface AccountData {
  type: number;
  name: string;
}

interface AccountType {
  defineArr: Array<{
    name: string;
    type: number;
    text: string;
  }>;
  getTypeText: Function;
}

export interface AppMenu {
  menuList: Array<Menu>;
}

export interface Menu {
  name: string;
  text: string;
  active?: boolean;
  hide?: boolean;
}

export interface AppCss {
  primaryColor: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config')

export const APP_MENU = new InjectionToken<AppMenu>('app.menu')

export const APP_CSS = new InjectionToken<AppMenu>('app.css')

export const APP_DI_CONFIG: AppConfig = {
  title: 'System',
  accountType: {
    defineArr: [
      {
        name: "admin",
        type: 0,
        text: '超级管理员'
      }
    ],
    getTypeText(type: number): string {
      return this.defineArr[type].text;
    }
  }
};

export const APP_DI_MENU: AppMenu = {
  menuList : [
    {
      name: "homePage",
      text: "首页"
    },
    {
      name: "city",
      text: "城市管理"
    },
    {
      name: "group",
      text: "集团管理"
    },
    {
      name: "project",
      text: "项目管理"
    }
  ]
};

export const APP_DI_CSS: AppCss = {
  primaryColor: "#409eff"
};

