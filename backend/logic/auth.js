const UserRepository = require("../db/user");

// TODO: ユーザー情報のみを返却して、index.jsではユーザー情報がなければ403エラーを返却するようにする
//       この関数(ファイルごと)いらない気がする。
/**
 * ユーザー情報を検証
 * 
 * @param {*} db
 * @param {*} userId
 * @param {*} password
 * @returns {Promise<Object>}
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
