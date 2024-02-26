import db from './index';
import '@server/model/User';
import '@server/model/Poster';

export default async function () {
  await db.sequelize.sync({
    force: process.env.DB_FORCE === 'TRUE' ? true : false,
  });
  await db.connectTest();
}
