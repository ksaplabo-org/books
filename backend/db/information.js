const { STRING, DATE, SMALLINT } = require("sequelize");

module.exports.getInformationModel = function (db) {
  return db.define(
    "information",
    {
      no: {
        field: "no",
        type: SMALLINT,
        primaryKey: true,
        allowNull: false,
      },
      date: {
        field: "date",
        type: DATE,
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
