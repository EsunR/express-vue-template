import del from 'del';
import { series } from 'gulp';
import { buildClient } from './builders/client';
import { copyToDist } from './builders/copy';
import { buildServer } from './builders/server';
import { withTaskName } from './utils';
import { DIST_DIR_PATH } from './utils/path';

export default series(
  // 删除 dist 目录
  withTaskName('🧹 clean dist file', () => del(DIST_DIR_PATH, { force: true })),
  // 构建服务端代码
  withTaskName('📦︎ build server pack', buildServer),
  // 构建客户端代码
  withTaskName('📦︎ build client pack', buildClient),
  withTaskName('📄 copy some file to dist ...', copyToDist)
);
