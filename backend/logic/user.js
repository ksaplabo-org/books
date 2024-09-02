const UserRepository = require("../db/user");

/**
 * ユーザー情報一覧を取得
 * @param {*} db 
 * @returns ユーザー情報(Promise)
 */
 module.exports.getAll = async function (db) {
    const UserModel = UserRepository.getUserModel(db);
    try {
        return await UserModel.findAll(
            {
                order: [
                    ["user_id", "ASC"]
                ]
            }
        );
    } catch (e) {
        throw e;
    }
}

/**
 * ユーザー情報取得
 *   部分一致検索(ユーザーID、ユーザー名)
 * @param {*} db 
 * @param {*} word
 * @returns ユーザー情報（Promise）
 */
 module.exports.findByIncludeIdOrName = async function (db, word) {
    const UserModel = UserRepository.getUserModel(db);
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;

    try {
        return await UserModel.findAll(
            {
                where: {
                    [Op.or]: {
                        user_id: {[Op.like]: '%' + word + '%'},
                        user_name: {[Op.like]: '%' + word + '%'}
                    }
                },
                order: [
                    ["user_id", "ASC"]
                ]
            }
        );
    } catch (e) {
        throw e;
    }
}

/**
 * ユーザー情報の部分一致検索(ユーザーID、ユーザー名、住所、電話番号)
 * 
 * @param {*} db 
 * @param {*} word 
 * @returns 
 */
module.exports.findByIncludeItem = async function (db, word) {
    const UserModel = UserRepository.getUserModel(db);
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;

    try {
        return await UserModel.findAll(
            {
                where: {
                    [Op.or]: {
                        user_id: {[Op.like]: '%' + word + '%'},
                        user_name: {[Op.like]: '%' + word + '%'},
                        address: {[Op.like]: '%' + word + '%'},
                        tel_no: {[Op.like]: '%' + word + '%'}
                    }
                },
                order: [
                    ["user_id", "ASC"]
                ]
            }
        );
    } catch (e) {
        throw e;
    }
}

/**
 * 権限を検索条件として、ユーザー情報を検索する
 * 
 * @param {*} db 
 * @param {*} auth 
 * @returns 
 */
module.exports.findByAuth = async function(db, auth) {
    const UserModel = UserRepository.getUserModel(db);

    try {
        return await UserModel.findAll(
            {
                where: {
                    auth: auth
                },
                order: [
                    ["user_id", "ASC"]
                ]
            }
        );
    } catch (e) {
        throw e;
    }
}

/**
 * ユーザー情報取得
 *   完全一致検索(ユーザーID)
 * @param {*} db 
 * @param {*} userId
 * @returns ユーザー情報(Promise)
 */
 module.exports.findById = async function (db, userId) {
    const UserModel = UserRepository.getUserModel(db);
    try {
        return await UserModel.findByPk(userId);
    } catch (e) {
        throw e;
    }
}

/**
 * ユーザー情報登録
 * @param {*} db 
 * @param {*} userId
 * @param {*} userName
 * @param {*} password
 * @param {*} gender
 * @param {*} auth
 * @param {*} address
 * @param {*} telNo
 * @returns Promise(成功:resolve/失敗:reject)
 */
 module.exports.create = async function (db, userId, userName, password, gender, auth, address, telNo) {
    const UserModel = UserRepository.getUserModel(db);
    try {
        return await UserModel.create(
            {
                user_id: userId,
                user_name: userName,
                password: password,
                gender: gender,
                auth: auth,
                address: address,
                tel_no: telNo
            }
        );
    } catch (e) {
        throw e;
    }
}

/**
 * ユーザー情報更新
 * @param {*} db 
 * @param {*} userId
 * @param {*} userName
 * @param {*} password
 * @param {*} gender
 * @param {*} auth
 * @param {*} address
 * @param {*} telNo
 * @returns Promise(成功:resolve/失敗:reject)
 */
 module.exports.update = async function (db, userId, userName, password, gender, auth, address, telNo) {
    const UserModel = UserRepository.getUserModel(db);
    try {
        return await UserModel.update(
            {
                user_name: userName,
                password: password,
                gender: gender,
                auth: auth,
                address: address,
                tel_no: telNo
            },
            {
                where: {
                    user_id: userId
                }
            }
        );
    } catch (e) {
        throw e;
    }
}  

/**
 * ユーザー情報削除
 * @param {*} db 
 * @param {*} userId
 * @returns Promise(成功:resolve/失敗:reject)
 */
 module.exports.remove = async function (db, userId) {
    const UserModel = UserRepository.getUserModel(db);
    try {
        return await UserModel.destroy(
            {
                where: {
                    user_id: userId
                }
            }
        );
    } catch (e) {
        throw e;
    }
}
