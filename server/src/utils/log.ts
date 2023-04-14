import { LOG_DIR_PATH } from '@server/config/paths';
import fs from 'fs';
import log4js from 'log4js';
import readline from 'node:readline';
import path from 'path';

log4js.configure({
  appenders: {
    console: {
      type: 'console',
    },
    file: {
      type: 'file',
      filename: path.resolve(LOG_DIR_PATH, 'app.log'),
    },
    dbFile: {
      type: 'file',
      filename: path.resolve(LOG_DIR_PATH, 'db.log'),
    },
    requestFile: {
      type: 'file',
      filename: path.resolve(LOG_DIR_PATH, 'request.log'),
    },
  },
  categories: {
    default: {
      appenders: ['console', 'file'],
      level: 'debug',
    },
    db: {
      appenders: ['console', 'dbFile'],
      level: 'debug',
    },
    request: {
      appenders: ['console', 'requestFile'],
      level: 'debug',
    },
  },
});

export const logger = log4js.getLogger('default');
export const dbLogger = log4js.getLogger('db');
export const requestLogger = log4js.getLogger('request');

/**
 * 解析日志内容
 * 日志格式示例：[2022-05-10T00:19:26.879] [LEVEL] category - Received message form user
 * @param row
 * @returns
 */
export function parseLogRow(row: string) {
  const splitIndex = new RegExp(' - ').exec(row)?.index;
  if (typeof splitIndex !== 'number') {
    return undefined;
  }
  const logInfoParts = row.slice(0, splitIndex).trim().split(' ');
  if (logInfoParts.length !== 3) {
    return undefined;
  }
  const message = row.slice(splitIndex + 3).trim();
  const logInfo = {
    time: logInfoParts[0].slice(1, -1),
    level: logInfoParts[1].slice(1, -1),
    categories: logInfoParts[2],
    message,
  };
  return logInfo;
}

/**
 * 清除目标日期前的日志
 * @param fileName 日志文件名
 * @param date 目标日期
 */
export async function cleanLogFileBeforeDate(fileName: string, date: Date) {
  const targetTimeStamp = date.valueOf();
  const logFilePath = path.resolve(LOG_DIR_PATH, fileName);
  const fileStream = fs.createReadStream(logFilePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let newFileContentArr = [];
  let findTimePoint = false;
  for await (const line of rl) {
    // 是否已经找到了目标时间点
    if (findTimePoint) {
      newFileContentArr.push(line);
    }
    // 没有找到的话就走查找流程
    else {
      const logInfo = parseLogRow(line);
      // 当前行无法解析，跳过当前行
      if (!logInfo) {
        continue;
      }
      const logTimeStamp = new Date(logInfo.time).valueOf();
      // 找到了日志时间大于目标时间的行
      if (logTimeStamp >= targetTimeStamp) {
        findTimePoint = true;
        newFileContentArr.push(line);
      }
    }
  }
  fs.writeFileSync(logFilePath, newFileContentArr.join('\n'));
}
