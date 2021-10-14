
/**
  * 设置期限Storage
  * 
  * @param {Storage} storage 存储对象类型 localStorage或者sessionStorage
  * @param {string} key 存储对象名称
  * @param {*} value 存储对象值
  * @param {number} expire 存储时间(毫秒)
  */
export function setExpireStorage(storage: Storage, key: string, value: any, expire?: number) {
  interface Item {
    data: any;
    time: number;
    expire?: number;
  }
  let item: Item = {
    data: value,
    time: Date.now(),
    expire: expire
  };
  storage.setItem(key, JSON.stringify(item));
}

/**
 * 获取Storage
 * 
 * @param {Storage} storage 存储对象类型 localStorage或者sessionStorage
 * @param {string} key 存储对象名称
 * 
 * @returns {*}
 */
export function getExpireStorage(storage: Storage, key: string): any {
  let val = storage.getItem(key);
  if (!val) {
    return val;
  }
  let parseVal = JSON.parse(val);
  if (parseVal.time) {
    if (parseVal.expire) {
      if (Date.now() - parseVal.time > parseVal.expire) {
        storage.removeItem(key);
        return null;
      }
    }
    return parseVal.data;
  } else {
    return parseVal;
  }
}

/**
 * 获取cookie(必须在浏览器环境下运行)
 * 
 * @param {string} name 存储对象名称
 * 
 * @returns {string | undefined}
 */
export function getCookie(name: string): string | undefined {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches
    ? matches[1]
      ? JSON.parse(decodeURIComponent(matches[1]))
      : undefined
    : undefined;
}

/**
 * 设置cookie(必须在浏览器环境下运行)
 * 
 * @param {string} name 存储对象名称
 * @param {string} value 存储对象
 * @param {object | undefined} opt 该cookie的配置值
 * 
 */
export function setCookie(name: string, value: string, opt = {}) {
  interface Options {
    path: string;
    expires?: Date | string;
    [propName: string]: any;
  }
  let options: Options = {
    path: '/'
  };
  Object.assign(options, opt);
  if (options.expires && options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }
  let updatedCookie =
    encodeURIComponent(name) +
    "=" +
    encodeURIComponent(
      typeof value == "object" ? JSON.stringify(value) : value
    );
  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }
  document.cookie = updatedCookie;
}

/**
 * 删除cookie(依赖setCookie方法)(必须在浏览器环境下运行)
 * 
 * @param {string} name 存储对象名称
 * 
 */
export function deleteCookie(name: string) {
  // 设置到期时间 max-age(秒数) expires(时间)
  setCookie(name, "", {
    'max-age': -1
  });
}


