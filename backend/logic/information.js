const sequelize = require("sequelize");

const informationRepository = require("../db/information");

/**
 * お知らせ情報を全件検索
 *
 * @param {*} db
 * @returns {Promise<Object[]>}
 */
module.exports.getAll = async function (db) {
  const informationModel = informationRepository.getInformationModel(db);

  try {
    return await informationModel.findAll({
      attributes: [[sequelize.fn("date_format", sequelize.col("date"), "%Y/%m/%d"), "date"], "no", "title", "content"],
      order: [
        ["date", "DESC"],
        ["no", "DESC"],
      ],
    });
  } catch (e) {
    throw e;
  }
};

/**
 * お知らせ情報を新規登録
 *
 * @param {*} db
 * @param {*} title
 * @param {*} content
 * @returns {Promise<void>}
 */
module.exports.create = async function (db, title, content) {
  const informationModel = informationRepository.getInformationModel(db);

  // noの最大値をインクリメントした値を取得
  const no = (await informationModel.max("no")) + 1;

  try {
    await informationModel.create({
      no: no,
      date: sequelize.fn("now"),
      title: title,
      content: content,
    });
  } catch (e) {
    throw e;
  }
};

/**
 * お知らせ情報を更新
 *
 * @param {*} db
 * @param {*} no
 * @param {*} title
 * @param {*} content
 * @returns {Promise<void>}
 */
module.exports.update = async function (db, no, title, content) {
  const informationModel = informationRepository.getInformationModel(db);

  try {
    await informationModel.update(
      {
        title: title,
        content: content,
      },
      {
        where: {
          no: no,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};

/**
 * お知らせ情報を削除
 *
 * @param {*} db
 * @param {*} no
 * @returns {Promise<void>}
 */
module.exports.remove = async function (db, no) {
  const informationModel = informationRepository.getInformationModel(db);

  try {
    await informationModel.destroy({
      where: {
        no: no,
      },
    });
  } catch (e) {
    throw e;
  }
};
