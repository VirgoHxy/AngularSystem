// getRegularTime参数
interface RegularTimeParam {
  (value: string | number | Date | RegularTimeObject): Date | null;
}

// format参数
interface FormatParam {
  (value: string | number | Date | RegularTimeObject, formatStr?: string): string;
}

// RegularTimeObject 参数
interface RegularTimeObject {
  type: string;
  data: any;
}

/**
 * 获取合规时间
 *
 * @param {string | number | Date | object} value 时间值
 *
 * @returns {Date | null} 返回时间对象
 */
export let getRegularTime: RegularTimeParam = function (value) {
  if (typeof value == 'string') {
    // 下面处理未考虑时区问题
    // let match = value.match(/\.([\d]{1,})[Z]*/);
    // let ms = (match && Number(match[1])) || 0;
    // if (/T/g.test(value)) {
    //   // 去T
    //   value = value.replace(/T/g, ' ');
    // }
    // if (/\./g.test(value)) {
    //   // 去毫秒 兼容ios ie firefox
    //   value = value.replace(/\.[\d]{1,}[Z]*/, '');
    // }
    // if (/-/g.test(value)) {
    //   // new Date兼容ios ie firefox
    //   value = value.replace(/-/g, '/');
    // }
    let date = new Date(value);
    // date.setMilliseconds(ms);
    return date;
  } else if (typeof value == 'number') {
    return new Date(value);
  } else if (value instanceof Date) {
    return value;
  } else if (typeof value == 'object') {
    let { type, data } = value as RegularTimeObject;
    switch (type) {
      case 'xlsx':
        return getDate2XLSX(data);

      default:
        return null;
    }
  } else {
    return null;
  }
};

/**
 * 获取xlsx合规时间
 *
 * @param {number} serial 时间数字
 *
 * @returns {Date} 返回时间对象
 */
export function getDate2XLSX(serial: number): Date {
  let utc_days = Math.floor(serial - 25569);
  let utc_value = utc_days * 86400;
  let date_info = new Date(utc_value * 1000);
  let fractional_day = serial - Math.floor(serial) + 0.0000001;
  let total_seconds = Math.floor(86400 * fractional_day);
  let seconds = total_seconds % 60;
  total_seconds -= seconds;
  let hours = Math.floor(total_seconds / (60 * 60));
  let minutes = Math.floor(total_seconds / 60) % 60;
  let date = new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds
  );
  return date;
}

/**
 * 格式化时间(依赖getRegularTime方法)
 *
 * @param {string | number | Date | object} value 时间值
 * @param {string} [formatStr = "YYYY-MM-DD hh:mm:ss"] 格式化规则
 *
 * @returns {string} 返回字符串时间
 */
export let format: FormatParam = function (
  value,
  formatStr ='YYYY-MM-DD hh:mm:ss'
) {
  let myDate = getRegularTime(value);
  if (!myDate) {
    return '请输入正确的日期';
  }
  if (isNaN(myDate.getTime())) {
    return '请输入正确的日期';
  }
  let str = formatStr,
    week = [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六',
    ],
    fullYear = myDate.getFullYear(),
    year = Number(String(fullYear).substring(2)),
    month = myDate.getMonth(),
    date = myDate.getDate(),
    day = myDate.getDay(),
    hour = myDate.getHours(),
    minute = myDate.getMinutes(),
    second = myDate.getSeconds(),
    mSecond = myDate.getMilliseconds();
  //四位年份
  str = str.replace(/yyyy|YYYY/, fullYear + '');
  //两位年份，小于10补零
  str = str.replace(/yy|YY/, year > 9 ? year + '' : '0' + year);
  //月份，小于10补零
  str = str.replace(/MM/, month + 1 > 9 ? month + 1 + '' : '0' + (month + 1));
  //月份，不补零
  str = str.replace(/\bM\b/, month + 1 + '');
  //日期，小于10补零
  str = str.replace(/dd|DD/, date > 9 ? date + '' : '0' + date);
  //日期，不补零
  str = str.replace(/d|D/, date + '');
  //小时，小于10补零
  str = str.replace(/hh|HH/, hour > 9 ? hour + '' : '0' + hour);
  //小时，不补零
  str = str.replace(/h|H/, hour + '');
  //分钟，小于10补零
  str = str.replace(/mm/, minute > 9 ? minute + '' : '0' + minute);
  //分钟，不补零
  str = str.replace(/\bm\b/, minute + '');
  //秒钟，小于10补零
  str = str.replace(/ss|SS/, second > 9 ? second + '' : '0' + second);
  //秒钟，不补零
  str = str.replace(/\bs\b|\bS\b/, second + '');
  //星期几
  str = str.replace(/w|W/g, week[day]);
  //毫秒，小于9或99补零
  str = str.replace(
    /MS/,
    mSecond > 9 ? (mSecond > 99 ? mSecond + '' : '0' + mSecond) : '00' + mSecond
  );
  //毫秒，不补零
  str = str.replace(/ms/, mSecond + '');
  return str;
}
