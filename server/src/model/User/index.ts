import { UserInstance } from "@koa-vue-template/types/model";
import db from "@server/db";
import { DataTypes, Sequelize } from "sequelize";

export function createUserModel(sequelize: Sequelize) {
  const UserModel = sequelize.define<UserInstance>("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  });

  return UserModel;
}

const userModel = createUserModel(db.sequelize);

export default userModel;
