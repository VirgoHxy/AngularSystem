/**
 * 账号信息
 */
export interface AccountInfo {
  /* 账号 */
  account: string;
  /* 密码 */
  password: string;
}

/**
 * 账号数据
 */
export interface AccountData {
  /* 账号类型 */
  type: number;
  /* 账号名称 */
  name: string;
}

export interface Test {
	a: number;
	b: boolean;
	c: string;
	d?: any;
}

export interface ResponseData {
	code: number;
	data: number[];
	msg: string;
	test: Test;
}