import db from '@server/db';
import dbGenerator from '@server/db/db_generator';
import { globSync } from 'glob';
import path from 'path';
import { env } from 'process';
import { dbLogger } from './utils/log';

dbGenerator().then(async () => {
  const isNewDb = await db.checkIsNew();
  if (isNewDb) {
    const migrationsPath =
      env.NODE_ENV === 'production'
        ? require(path.join(__dirname, '../../.sequelizerc'))['migrations-path']
        : path.join(__dirname, '../../packages/db_migration/migrations');
    const migrationFileNames = globSync(`${migrationsPath}/*.js`).map(
      (filePath) => filePath.split('/').pop()
    );
    if (migrationFileNames) {
      dbLogger.info('查询到已创建的 migration 记录，正在进行登记');
      for (const fileName of migrationFileNames) {
        try {
          await db.sequelize.query(
            `INSERT INTO SequelizeMeta (name) VALUES ('${fileName}')`
          );
        } catch (e) {
          dbLogger.error('migration 记录登记失败: ', e);
        }
      }
    }
    dbLogger.info('migration 记录登记完成，数据库初始化完成');
  } else {
    dbLogger.info('数据库已存在，无需初始化');
  }
});
