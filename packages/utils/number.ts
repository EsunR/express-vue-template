/**
 * 获取数字或者 null
 */
export function returnNumOrNull(val: any): number | null {
  if (typeof val === 'number') {
    return val;
  }
  return null;
}

/**
 * 获取保留了小数点后 n 为的数
 */
export function getFixedNumber(num: number, fixed: number = 2) {
  return Number(num.toFixed(fixed));
}

/**
 * 判断是否是数字字符串
 */
export function isNumberString(val: any) {
  if (typeof val === 'string' && !isNaN(Number(val))) {
    return true;
  }
  return false;
}
