const sequelize = require("sequelize");

/**
 * DBコネクション取得
 * @returns DBコネクション
 */
module.exports.connect = function () {
  return new sequelize("intern", "root", "root", {
    dialect: "mysql",
    host: "localhost",
    pool: {
      max: 5,
      min: 1,
      acquire: 30000,
      idle: 10000,
    },
  });
};
