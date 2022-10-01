const { STRING, DATE } = require("sequelize");

module.exports. getLendingModel = function (db) {
    var lending = db.define(
        "lending",
        {
        lending_user_id: {
            field: "lending_user_id",
            type: STRING(16),
            primaryKey: true,
            allowNull: false
        },
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
        rental_date: {
            field: "rental_date",
            type: DATE,
            primaryKey: true,
            allowNull: false
        },
        managed_user_id: {
            field: "managed_user_id",
            type: STRING(16),
            allowNull: false
        },
        return_plan_date: {
            field: "return_plan_date",
            type: DATE,
            allowNull: false
        },
        return_act_date: {
            field: "return_act_date",
            type: DATE,
            allowNull: true
        }},
        {
            createdAt: false, //デフォルト項目を生成しないように
            updatedAt: false,  //デフォルト項目を生成しないように
            tableName: "lending" //明示的にテーブル名を指定
        }
    );

    lending.associate = function(models) {
        lending.belongsTo(models.Book, {
            foreignKey: 'isbn',
            targetKey: 'isbn'
        });
    }

    return lending;}
