import {Model, DataTypes} from 'sequelize'
import { sequelize } from "../config/db";
import { PasswordResetToken } from './password';
export class User extends Model {}

User.init(
  {
    user_id: {
      allowNull: false,
      type: DataTypes.STRING,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.hasOne(PasswordResetToken);
PasswordResetToken.belongsTo(User);

sequelize.sync({ alter: true });