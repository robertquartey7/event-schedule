import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { User } from "./user";
export class PasswordResetToken extends Model {}

PasswordResetToken.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_expired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    expiration_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "PasswordResetToken",
  }
);


