const { STRING, DATE } = require("sequelize");

module.exports. getBookModel = function (db) {
    return db.define(
            "book",
            {
            isbn: {
                field: "isbn",
                type: STRING(13),
                primaryKey: true,
                allowNull: false
            }, 
            book_id: {
                field: "book_id",
                type: STRING(13),
                primaryKey: true,
                allowNull: false
            }, 
            title: {
                field: "title",
                type: STRING(100),
                allowNull: false
            },
            description: {
                field: "description",
                type: STRING(1024),
                allowNull: true
            },
            img_url: {
                field: "img_url",
                type: STRING(255),
                allowNull: true
            },
            rental_status: {
                field: "rental_status",
                type: STRING(100),
                allowNull: true
            },
            rental_user: {
                field: "rental_user",
                type: STRING(100),
                allowNull: true
            }},
            {
                createdAt: false, //デフォルト項目を生成しないように
                updatedAt: false,  //デフォルト項目を生成しないように
                tableName: "book" //明示的にテーブル名を指定
            }
        )
}
