const sequelize = require("sequelize");
const Op = sequelize.Op;

const UserRepository = require("../db/user");

/**
 * ユーザー情報を全件検索
 *
 * @param {*} db
 * @returns {Promise<Object[]>}
 */
module.exports.findAll = async function (db) {
  try {
    const userModel = UserRepository.getUserModel(db);
    return await userModel.findAll({
      order: [["user_id", "ASC"]],
    });
  } catch (e) {
    throw e;
  }
};

/**
 * ユーザー情報を取得
 *
 * [検索条件]
 * ユーザーIDの完全一致
 *
 * @param {*} db
 * @param {*} userId
 * @returns {Promise<Object>}
 */
module.exports.findById = async function (db, userId) {
  // ユーザー情報の定義を取得
  const userModel = UserRepository.getUserModel(db);

  try {
    return await userModel.findByPk(userId);
  } catch (e) {
    throw e;
  }
};

/**
 * ユーザー情報を検索
 *
 * [検索条件]
 * ユーザーIDの部分一致
 * OR
 * ユーザー名の部分一致
 *
 * @param {*} db
 * @param {*} userId
 * @param {*} userName
 * @returns {Promise<Object[]>}
 */
module.exports.findByIdOrNameLike = async function (db, userId, userName) {
  // ユーザー情報の定義を取得
  const userModel = UserRepository.getUserModel(db);

  try {
    return await userModel.findAll({
      where: {
        [Op.or]: {
          user_id: { [Op.like]: "%" + userId + "%" },
          user_name: { [Op.like]: "%" + userName + "%" },
        },
      },
      order: [["user_id", "ASC"]],
    });
  } catch (e) {
    throw e;
  }
};

/**
 * ユーザー情報を検索
 *
 * [検索条件]
 * ユーザーIDの部分一致
 * OR
 * ユーザー名の部分一致
 * OR
 * 住所の部分一致
 *
 * @param {*} db
 * @param {*} userId
 * @param {*} userName
 * @param {*} address
 * @returns {Promise<Object[]>}
 */
module.exports.findByIdOrNameOrAddressLike = async function (db, userId, userName, address) {
  // ユーザー情報の定義を取得
  const userModel = UserRepository.getUserModel(db);

  try {
    return await userModel.findAll({
      where: {
        [Op.or]: {
          user_id: { [Op.like]: "%" + userId + "%" },
          user_name: { [Op.like]: "%" + userName + "%" },
          address: { [Op.like]: "%" + address + "%" },
        },
      },
      order: [["user_id", "ASC"]],
    });
  } catch (e) {
    throw e;
  }
};

/**
 * ユーザー情報を検索
 *
 * [検索条件]
 * 権限の完全一致
 *
 * @param {*} db
 * @param {*} auth
 * @returns {Promise<Object[]>}
 */
module.exports.findByAuth = async function (db, auth) {
  const userModel = UserRepository.getUserModel(db);

  try {
    return await userModel.findAll({
      where: {
        auth: auth,
      },
      order: [["user_id", "ASC"]],
    });
  } catch (e) {
    throw e;
  }
};

/**
 * ユーザー情報を追加
 *
 * @param {*} db
 * @param {*} userId
 * @param {*} userName
 * @param {*} password
 * @param {*} gender
 * @param {*} auth
 * @param {*} address
 * @returns {Promise<void>}
 */
module.exports.create = async function (db, userId, userName, password, gender, auth, address) {
  // ユーザー情報の定義を取得
  const userModel = UserRepository.getUserModel(db);

  try {
    return await userModel.create({
      user_id: userId,
      user_name: userName,
      password: password,
      gender: gender,
      auth: auth,
      address: address,
    });
  } catch (e) {
    throw e;
  }
};

/**
 * ユーザー情報を更新
 *
 * @param {*} db
 * @param {*} userId
 * @param {*} userName
 * @param {*} password
 * @param {*} gender
 * @param {*} auth
 * @param {*} address
 * @returns {Promise<void>}
 */
module.exports.update = async function (db, userId, userName, password, gender, auth, address) {
  // ユーザー情報の定義を取得
  const userModel = UserRepository.getUserModel(db);

  try {
    return await userModel.update(
      {
        user_name: userName,
        password: password,
        gender: gender,
        auth: auth,
        address: address,
      },
      {
        where: {
          user_id: userId,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};

/**
 * ユーザー情報を削除
 *
 * @param {*} db
 * @param {*} userId
 * @returns {Promise<void>}
 */
module.exports.remove = async function (db, userId) {
  // ユーザー情報の定義を取得
  const userModel = UserRepository.getUserModel(db);

  try {
    return await userModel.destroy({
      where: {
        user_id: userId,
      },
    });
  } catch (e) {
    throw e;
  }
};
