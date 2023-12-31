const { DataTypes, Model, Op } = require("sequelize");
const { sequelize } = require("../config/database/connect");
const Invitation = require("./Invitation");
const Home = require("./Home");
const Token = require("./Token");
const { ACCOUNT_LEVEL } = require("../config/constant/constant_model");
class Account extends Model {}
Account.init(
  {
    accountId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true,
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    level: {
      type: DataTypes.ENUM,
      values: [...Object.values(ACCOUNT_LEVEL)],
      allowNull: false,
      defaultValue: ACCOUNT_LEVEL.user,
    },
  },
  {
    modelName: "Account",
    sequelize,
    timestamps: false,
    indexes: [
      { fields: ["email"], unique: true },
      { fields: ["phoneNumber"], unique: true },
    ],
  }
);

Account.hasMany(Home, { as: "homes", foreignKey: { name: "accountId" } });
Home.belongsTo(Account, { as: "account", foreignKey: { name: "accountId" } });
Account.hasOne(Token, { as: "token", foreignKey: { name: "accountId" } });
Account.hasMany(Invitation, {
  as: "invitations",
  foreignKey: { name: "accountId" },
});
Invitation.belongsTo(Account, {
  as: "account",
  foreignKey: { name: "accountId" },
});
module.exports = Account;
