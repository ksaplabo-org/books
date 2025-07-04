/**
 * sequelizeのモジュールimport
 */
const sequelize = require("sequelize");
const op = sequelize.Op;

/**
 * ユーザー情報の定義を取得
 */
const userRepository = require("../db/user");

/**
 * ユーザー情報を全件検索
 *
 * @param {*} db
 * @returns {Promise<Object[]>}
 */
module.exports.findAll = async function (db) {
  try {
    const userModel = userRepository.getUserModel(db);
    return await userModel.findAll({
      /**
       * ★問題3[ユーザー一覧] Start
       * データ取得時にユーザーIDで昇順表示するようにする。
       * (現在は「権限(auth)」で降順になっている。)
       */
      order: [["auth", "DESC"]],
      /**★問題3[ユーザー一覧] End*/
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
  const userModel = userRepository.getUserModel(db);

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
  const userModel = userRepository.getUserModel(db);

  try {
    return await userModel.findAll({
      /**
       * ★問題4[ユーザー一覧] Start
       * 検索条件指定してデータ取得をする際に、
       * ユーザーID、もしくはユーザー名の一部が条件に一致しているデータを取得できるようにする。
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
       * データ抽出結果が設計書の要望通りに出力されているかどうか確認する。
       */
      where: {
        [op.or]: {
          user_id: { [op.like]: "%" + userId + "%" },
          auth: "1",
        },
      },
      /**★問題4[ユーザー一覧] End*/
      /**★問題5[ユーザー一覧] End*/
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
 * @returns {Promise<void>}
 */
module.exports.create = async function (db, userId, userName, password, gender, auth) {
  // ユーザー情報の定義を取得
  const userModel = userRepository.getUserModel(db);

  try {
    /**
     * ★問題11[ユーザー追加] Start
     * 登録処理が正常に実行できるようにする。
     */
    return await userModel.create({
    });
    /**★問題11[ユーザー追加] End*/
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
 * @returns {Promise<void>}
 */
module.exports.update = async function (db, userId, userName, password, gender, auth) {
  // ユーザー情報の定義を取得
  const userModel = userRepository.getUserModel(db);

  try {
    return await userModel.update(
      {
        user_name: userName,
        password: password,
        gender: gender,
        auth: auth,
      },
      {
        /**
         * ★問題4[ユーザー管理] Start★
         * 更新対象データを絞る条件を追加してください。
         * ※現在は全てのデータを更新するように設定されています。
         */
        /**★問題4[ユーザー管理] End★ */
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
  const userModel = userRepository.getUserModel(db);

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
