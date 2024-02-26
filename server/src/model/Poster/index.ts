import { PosterInstance } from '@express-vue-template/types/model';
import db from '@server/db';
import { DataTypes, Sequelize } from 'sequelize';

export function createPosterModel(sequelize: Sequelize) {
  const PosterModel = sequelize.define<PosterInstance>('Poster', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    schema: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  });

  return PosterModel;
}

const posterModel = createPosterModel(db.sequelize);

export default posterModel;
