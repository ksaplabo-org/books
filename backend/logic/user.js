//★
const UserRepository = require("../db/user");

/**
 * 全ユーザー情報取得
 * @param {*} db 
 * @returns ユーザー情報(Promise)
 */
 module.exports.getAll = async function (db) {
    const UserModel = UserRepository.getUserModel(db);

    try {
        return await UserModel.findAll({ order: [ ["userName", "ASC"] ]});
    } catch (error) {
        throw error;
    }
}
//★
