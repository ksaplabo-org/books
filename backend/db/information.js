const { STRING, DATE, TINYINT } = require("sequelize");

module.exports.getInformationModel = function (db) {
  return db.define(
    "information",
    {
      date: {
        field: "date",
        type: DATE,
        primaryKey: true,
        allowNull: false,
      },
      no: {
        field: "no",
        type: TINYINT,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        field: "title",
        type: STRING(100),
        allowNull: false,
      },
      content: {
        field: "content",
        type: STRING(100),
        allowNull: false,
      },
    },
    {
      createdAt: false, //デフォルト項目を生成しないように
      updatedAt: false, //デフォルト項目を生成しないように
      tableName: "information", //明示的にテーブル名を指定
    }
  );
};
