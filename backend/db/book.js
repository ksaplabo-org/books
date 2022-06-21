const { STRING } = require("sequelize");

module.exports. getBookModel = function (db) {
    return db.define(
            "book",
            {
            title: {
                field: "title",
                type: STRING(100),
                primaryKey: true
            }, 
            description: {
                field: "description",
                type: STRING(1024),
            }, 
            imgUrl: {
                field: "imgUrl",
                type: STRING(255),
                allowNull: false
            },
            isbn: {
                field: "isbn",
                type: STRING(200),
                allowNull: true
            },
            rentalDate: {
                field: "rentalDate",
                type: STRING(200),
                allowNull: true
            },
            returnDate: {
                field: "returnDate",
                type: STRING(200),
                allowNull: true
            },
            rentalStatus: {
                field: "rentalStatus",
                type: STRING(200),
                allowNull: true
            },
            rentalUser: {
                field: "rentalUser",
                type: STRING(200),
                allowNull: true
            }},
            {
                createdAt: false, //デフォルト項目を生成しないように
                updatedAt: false,  //デフォルト項目を生成しないように
                tableName: "book" //明示的にテーブル名を指定
            }
        )
}
