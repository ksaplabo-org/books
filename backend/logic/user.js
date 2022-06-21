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
/**
 * ユーザー情報登録
 * @param {*} db 
 * @param {*}  userId
 * @param {*}  userName
 * @param {*}  password
 * @param {*}  gender
 * @param {*}  userAuth
 * @returns ユーザー情報(Promise)
 */
 module.exports.create = async function (db, userId, userName, password,gender,userAuth) {
    const UserModel = UserRepository.getUserModel(db);
    try {
        return await UserModel.create({userId:userId, userName:userName, password:password, gender:gender, userAuth:userAuth});
    } catch (error) {
        throw error;
    }
}   