const Sequelize = require("sequelize");

/**
 * DBコネクション取得
 * @returns DBコネクション
 */
module.exports.connect = function () {
  return new Sequelize("intern", "intern", "intern", {
    dialect: "mysql",
    host: "localhost",
    pool: {
      max: 5,
      min: 1,
      acquire: 30000,
      idle: 10000
    }
  });
}
