import fs from 'fs';
import childProcess, { ExecOptions } from 'child_process';

type VerifyResult = {
  result: boolean;
  errMsg: string;
};

/**
 * 校验请求参数
 */
export function verifyRequestArgs(
  args: Record<string, any>,
  verifyKeys: (
    | string
    | { key: string; type: 'string' | 'array'; required?: boolean }
  )[]
): VerifyResult {
  let result: VerifyResult = {
    result: true,
    errMsg: '',
  };

  verifyKeys.some((verifyItem) => {
    if (typeof verifyItem === 'string') {
      if (args[verifyItem] === undefined) {
        result = {
          result: false,
          errMsg: `缺少参数 ${verifyItem}`,
        };
        return true;
      }
    } else {
      const { key, type, required = true } = verifyItem;
      if (type === 'string') {
        if (typeof args[key] !== 'string') {
          result = {
            result: false,
            errMsg: `${verifyItem.key} 必须为字符串类型的值`,
          };
          return true;
        }
        if (required && !args[key]) {
          result = {
            result: false,
            errMsg: `${verifyItem.key} 不能为空字符串`,
          };
          return true;
        }
      } else if (type === 'array') {
        if (!(args[key] instanceof Array)) {
          result = {
            result: false,
            errMsg: `${verifyItem.key} 必须为数组类型的值`,
          };
          return true;
        }
        if (required && !args[key].length) {
          result = {
            result: false,
            errMsg: `${verifyItem.key} 不能为空数组`,
          };
          return true;
        }
      }
    }
  });

  return result;
}

/**
 * 执行 shell 命令
 */
export async function carryShell(sh: string, option: ExecOptions = {}) {
  return new Promise((resolve, reject) => {
    childProcess.exec(sh, option, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      resolve(stdout);
    });
  });
}

/**
 * 检查是否有对应的文件夹，如果没有则创建对应的路径
 */
export function checkDirExist(dirPath: string) {
  const pathArr = dirPath.split('/');
  pathArr.reduce((prev, next) => {
    const currentPath = `${prev}/${next}`;
    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
    return currentPath;
  });
}
