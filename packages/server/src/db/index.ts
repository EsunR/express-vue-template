import { DB_DIR_PATH } from '@server/config/paths';
import { dbLogger } from '@server/utils/log';
import path from 'path';
import { Sequelize } from 'sequelize';

class Db {
  sequelize: Sequelize;
  constructor() {
    this.sequelize = this._connect();
  }
  _connect() {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: path.join(DB_DIR_PATH, 'express-vue-template.sqlite'),
    });
    return sequelize;
  }
  async checkIsNew() {
    try {
      const [result] = await this.sequelize.query(
        'SELECT * FROM SequelizeMeta'
      );
      return result.length === 0;
    } catch {
      // 如果没有 SequelizeMeta 表，说明是新数据库，同时创建 SequelizeMeta 表
      dbLogger.warn('SequelizeMeta 表未找到, 进行初始化创建');
      await this.sequelize.query(
        'CREATE TABLE "SequelizeMeta" ("name" VARCHAR(255) NOT NULL UNIQUE, PRIMARY KEY ("name"))'
      );
      return true;
    }
  }
  async connectTest() {
    try {
      await this.sequelize.authenticate();
      dbLogger.info('数据库已连接');
    } catch (error) {
      dbLogger.error('无法连接数据库:', error);
    }
  }
}

export default new Db();
