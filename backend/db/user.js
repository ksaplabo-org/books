const Sequelize = require("sequelize");

module.exports.getUserModel = (db) => {
    return db.define(
            "user",
            {
            userId: {
                field: "user_id",
                type: Sequelize.STRING(16),
                primaryKey: true,
                allowNull: false
            }, 
            userName: {
                field: "user_name",
                type: Sequelize.STRING(100),
                allowNull: false
            }, 
            password: {
                field: "user_password",
                type: Sequelize.STRING(16),
                allowNull: false
            },
            gender: {
                field: "user_gender",
                type: Sequelize.STRING(1),
                allowNull: false
            },
            userAuth: {
                field: "user_auth",
                type: Sequelize.STRING(1),
                allowNull: false
            }
            },
            {
                createdAt: false, //デフォルト項目を生成しないように
                updatedAt: false,  //デフォルト項目を生成しないように
                tableName: "user" //明示的にテーブル名を指定
            }
        )
}
