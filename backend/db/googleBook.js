const { STRING } = require("sequelize");

module.exports.getGoogleBookModel = function (db) {
  var GoogleBookModel = db.define(
    "google_book",
    {
      book_id: {
        field: "book_id",
        type: STRING(13),
        primaryKey: true,
        allowNull: false,
      },
      title: {
        field: "title",
        type: STRING(100),
        allowNull: false,
      },
      response_json: {
        field: "response_json",
        type: JSON,
        allowNull: false,
      },
    },
    {
      createdAt: false, //デフォルト項目を生成しないように
      updatedAt: false, //デフォルト項目を生成しないように
      tableName: "google_book", //明示的にテーブル名を指定
    }
  );

  return GoogleBookModel;
};
