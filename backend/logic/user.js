const UserRepository = require("../db/user");
/**
 * 全ユーザー情報取得
 * @param {*} db 
 * @returns ユーザー情報(Promise)
 */
 module.exports.getAll = async function (db) {
    const UserModel = UserRepository.getUserModel(db);
    try {
        return await UserModel.findAll({ order: [ ["user_id", "ASC"] ]});
    } catch (error) {
        throw error;
    }
}

/**
 * ユーザーIDのあいまい検索結果を取得する
 * @param {*} db 
 * @param {*} searchWord
 * @returns ユーザー情報（Promise）
 */
 module.exports.getUser = async function (db, searchWord) {
    const UserModel = UserRepository.getUserModel(db);
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;

    try {
        return await UserModel.findAll({ 
            where: {
                user_id: {
                    [Op.like]: '%' + searchWord + '%'
                } 
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * 指定ユーザー情報取得
 * @param {*} db 
 * @param {*} userId
 * @returns ユーザー情報(Promise)
 */
 module.exports.getEditUser = async function (db,userId) {
    const UserModel = UserRepository.getUserModel(db);
    try {
        return  await UserModel.findByPk(userId);
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
        return await UserModel.create({user_id:userId, user_name:userName, password:password, gender:gender, user_auth:userAuth});
    } catch (error) {
        throw error;
    }
}   

/**
 * ユーザー情報更新
 * @param {*} db 
 * @param {*}  userId
 * @param {*}  userName
 * @param {*}  password
 * @param {*}  gender
 * @returns ユーザー情報(Promise)
 */
 module.exports.update = async function (db, userId,  userName, password,gender) {
      const UserModel = UserRepository.getUserModel(db);

    try {
        // set update parameter
        const updateParams = {
            user_name: null,
            password: null,
            gender: null
        };

            updateParams.user_name = userName;
            updateParams.password = password;
            updateParams.gender = gender;
    
        // set filter parameter
        const filter = { where: { user_id: userId } }
    
        return await UserModel.update(updateParams, filter);

    } catch (error) {
        throw error;
    }
}  

/**
 * ユーザー情報削除
 * @param {*} db 
 * @param {*}  userId
 * @returns Promise（成功時 resolve/失敗時 reject）
 */
 module.exports. remove =  async function (db, userId) {
    const UserModel = UserRepository.getUserModel(db);

    try {
        return await UserModel.destroy({ where: { user_id: userId } });
    } catch (error) {
        console.log(error);
        throw error;
    }
}
