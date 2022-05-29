const Sequelize = require("sequelize");

module.exports.getUserModel = (db) => {
    return db.define(
            "user",
            {
            userId: {
                field: "user_id",
                type: Sequelize.STRING(100),
                primaryKey: true
            }, 
            userName: {
                field: "user_name",
                type: Sequelize.STRING(100),
                primaryKey: true
            }, 
            password: {
                field: "user_password",
                type: Sequelize.STRING(100),
                allowNull: false
            },
            comment: {
                field: "comment",
                type: Sequelize.STRING(200),
                allowNull: true
            }
            },
            {
                createdAt: false, //デフォルト項目を生成しないように
                updatedAt: false,  //デフォルト項目を生成しないように
                tableName: "user" //明示的にテーブル名を指定
            }
        )
}
