const Sequelize = require("sequelize");

module.exports.getStudentModel = (db) => {
  return db.define(
    "student",
    {
      id: {
        field: "id",
        type: Sequelize.STRING(8),
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        field: "first_name",
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      last_name: {
        field: "last_name",
        type: Sequelize.STRING(20),
        allowNull: false,
      },
    },
    {
      createdAt: false, //デフォルト項目を生成しないように
      updatedAt: false, //デフォルト項目を生成しないように
      tableName: "student", //明示的にテーブル名を指定
    }
  );
};
