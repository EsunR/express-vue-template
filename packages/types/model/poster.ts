import type {
  Model,
  Optional,
} from '@express-vue-template/server/node_modules/sequelize';

export interface PosterAttributes {
  id: number;
  schema: string;
  password: string;
  createdAt: string;
}

export interface PosterCreationAttribute
  extends Optional<PosterAttributes, 'id' | 'password' | 'createdAt'> {}

export interface PosterInstance
  extends Model<PosterAttributes, PosterCreationAttribute>,
    PosterAttributes {}
