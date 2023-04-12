export function isObject(value: any) {
  return Reflect.toString.call(value) === '[object Object]';
}

export function filterObject<T>(
  obj: T,
  filterHandle: (key: string, value: any) => boolean
): Partial<T> {
  const newObj: Partial<T> = {};
  if (isObject(obj)) {
    Object.keys(obj as any).forEach((key) => {
      if (filterHandle(key, (obj as any)[key])) {
        (newObj as any)[key] = (obj as any)[key];
      }
    });
  } else {
    throw new Error('filterObject 传入的数据类型需要为 Object');
  }
  return newObj;
}

export const DEFAULT_EMPTY_ITEMS = [null, undefined, ''];

/**
 * 传入一个对象，过滤掉对象中的空值字段
 * @param params
 * @param emptyValues
 * @returns
 */
export function returnNotEmptyValue<T>(
  params: T,
  emptyValues: any[] = DEFAULT_EMPTY_ITEMS
): Partial<T> {
  return filterObject(
    params,
    (key, value) =>
      !emptyValues.includes(typeof value === 'string' ? value.trim() : value)
  );
}

/**
 * 传入一个对象，该方法会遍历该对象的每一个值，如果当前值是一个字符串，那么会对字符串进行 trim 操作；该方法会修改对象本身，并返回修改后的结果。
 * @param obj 目标对象
 * @param optionalKeys 仅处理对象的部分字段，如果不传则会处理所有可处理的字段
 */
export function trimmedObjectValue<T extends { [key: string]: any }>(
  obj: T,
  optionalKeys?: string[]
) {
  if (isObject(obj)) {
    // 检查是否是仅对部分字段进行 trim 操作
    if (optionalKeys instanceof Array) {
      optionalKeys.forEach((key) => {
        const currentVal = obj[key];
        if (typeof currentVal === 'string') {
          (obj[key] as string) = currentVal.trim();
        }
      });
    }
    // 如果没有传入 optionalKeys，就对所有字段进行 trim 操作
    else {
      for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const currentVal = obj[key];
          // 如果当前遍历的值是字符串类型的，再进行处理
          if (typeof currentVal === 'string') {
            obj[key] = currentVal.trim();
          }
        }
      }
    }
  }
  return obj;
}
