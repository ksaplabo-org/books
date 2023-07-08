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
                /**
                 * ★問題3[ユーザー一覧] Start
                 * データ取得時にユーザーIDで昇順表示するようにする。
                 * (現在は「権限(auth)」で降順になっている。)
                 */
                order: [
                    ["auth", "DESC"]
                ]
                /**★問題3[ユーザー一覧] End*/
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
                /**
                 * ★問題4[ユーザー一覧] Start
                 * 検索条件指定してデータ取得をする際に、ユーザーIDだけでなくユーザー名でも検索できるようにする。
                 * (現在は「権限(auth)」で降順になっている。)
                 * 
                 * Sequelize：Node.js用のORマッパー
                 * Op：様々な演算子を使用できるようになる
                 * 　　<例>
                 *     Op.or：OR条件
                 *     Op.and：AND条件
                 *     Op.like：指定した文字列に一致する
                 *     Op.notLike：指定した文字列に一致しない
                 * 
                 * ★問題5[ユーザー一覧] Start
                 * データ抽出結果に問題がないかどうか最終確認する。
                 */
                where: {
                    [Op.or]: {
                        user_id: {[Op.like]: '%' + word + '%'},
                        auth:'1'
                    }
                },
                /**★問題4[ユーザー一覧] End*/
                /**★問題5[ユーザー一覧] End*/
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
 * @returns Promise(成功:resolve/失敗:reject)
 */
 module.exports.create = async function (db, userId, userName, password, gender, auth) {
    const UserModel = UserRepository.getUserModel(db);
    try {
        /**
         * ★問題11[ユーザー追加] Start
         * 登録処理が正常に実行できるようにする。
         */
        return await UserModel.create(
            {
            }
        );
        /**★問題11[ユーザー一覧] End*/
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
 * @returns Promise(成功:resolve/失敗:reject)
 */
 module.exports.update = async function (db, userId, userName, password, gender) {
    const UserModel = UserRepository.getUserModel(db);
    try {
        return await UserModel.update(
            {
                user_name: userName,
                password: password,
                gender: gender
            },
            {
                /**
                 * ★問題4 Start★
                 * 更新処理を呼び出せるように処理を記載する。
                 * ※ユーザー情報追加API(app.post("/api/users", function(req, res))を参照
                 * 
                 * ユーザー更新処理は「UserLogic.update」処理を呼び出して実行する。
                 */
                where: {
                    user_id: userId
                }
                /**★問題4 Start★ */
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
