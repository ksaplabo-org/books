const UserRepository = require("../db/user");

/**
 * ユーザー情報検証
 * @param {*} db
 * @param {*} userId
 * @param {*} password
 * @returns 検証結果＋ユーザー情報(Promise)
 */
module.exports.verify = async function (db, userId, password) {
  const userModel = UserRepository.getUserModel(db);

  try {
    const user = await userModel.findByPk(userId);
    const result = user !== null && password === user.password;

    let resultUser = null;
    if (result) {
      resultUser = {
        userId: user.user_id,
        userName: user.user_name,
        auth: user.auth,
      };
    }

    return {
      result: result,
      user: resultUser,
    };
  } catch (e) {
    throw e;
  }
};
