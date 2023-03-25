const Sequelize = require("sequelize");

module.exports.getUserModel = (db) => {
    return db.define(
            "user",
            {
                user_id: {
                    field: "user_id",
                    type: Sequelize.STRING(16),
                    primaryKey: true,
                    allowNull: false
                }, 
                user_name: {
                    field: "user_name",
                    type: Sequelize.STRING(100),
                    allowNull: false
                }, 
                password: {
                    field: "password",
                    type: Sequelize.STRING(16),
                    allowNull: false
                },
                gender: {
                    field: "gender",
                    type: Sequelize.STRING(1),
                    allowNull: false
                },
                auth: {
                    field: "auth",
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
