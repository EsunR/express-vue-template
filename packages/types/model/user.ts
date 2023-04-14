import type {
  Model,
  Optional,
} from '@express-vue-template/server/node_modules/sequelize';

export interface UserAttributes {
  id: number;
  name: string;
  password: string;
  note: string;
  createdAt: string;
}

export interface UserCreationAttribute
  extends Optional<UserAttributes, 'id' | 'note' | 'createdAt'> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttribute>,
    UserAttributes {}
