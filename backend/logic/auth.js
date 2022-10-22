const UserRepository = require("../db/user");

/**
 * ユーザー情報検証
 * @param {*} db
 * @param {*} userId 
 * @param {*} password 
 * @returns 検証結果＋ユーザー情報(Promise)
 */
module.exports.verify = async function (db, userId, password) {
    const UserModel = UserRepository.getUserModel(db);

    try {
        const user = await UserModel.findByPk(userId);
        const result = (user !== null && password ===  user.password);   

        let resultUser = null;
        if (result) {
            resultUser = {
                userid: user.user_id,
                userName: user.user_name,
                userAuth: user.user_auth
            }
        }

        return {
            result: result,
            user: resultUser
        }
    } catch (error) {
        throw error;
    }
}
