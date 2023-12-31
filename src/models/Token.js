const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/database/connect");
class Token extends Model {}
Token.init(
  {
    tokenId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.TEXT,
    },
  },
  {
    modelName: "Token",
    sequelize,
    timestamps: false,
    indexes: [{ fields: ["accountId"], unique: true }],
  }
);

module.exports = Token;
