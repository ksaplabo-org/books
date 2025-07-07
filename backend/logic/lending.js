const sequelize = require("sequelize");

const LendingRepository = require("../db/lending");
const BookRepository = require("../db/book");

// TODO: 別のリポジトリにアクセスするべきではないので、index.jsで書籍情報を検索 -> それをもとに貸出状況の検索 とすべき
/**
 * ユーザーIDに紐づく貸出中の書籍情報を検索
 * [検索条件]
 * xxx
 *
 * @param {*} db
 * @param {*} userId
 * @returns {Promise<Object[]>}
 */
module.exports.getLendingUser = async function (db, userId) {
  const lendingModel = LendingRepository.getLendingModel(db);
  const bookModel = BookRepository.getBookModel(db);

  lendingModel.associate(bookModel);

  try {
    return await lendingModel.findAll({
      attributes: [
        [sequelize.fn("DATE_FORMAT", sequelize.col("rental_date"), "%Y/%m/%d"), "rental_date"],
        [sequelize.fn("DATE_FORMAT", sequelize.col("return_plan_date"), "%Y/%m/%d"), "return_plan_date"],
      ],
      where: {
        lending_user_id: userId,
      },
      raw: true,
      include: [
        {
          model: bookModel,
          required: true,
        },
      ],
    });
  } catch (e) {
    throw e;
  }
};

/**
 * 貸出/返却時の書籍の貸し出し状況を検索
 *
 * @param {*} db
 * @param {*} isbn
 * @param {*} lendingUserId
 * @returns {Promise<Object[]>}
 */
module.exports.selectAlreadyUser = async function (db, isbn, lendingUserId) {
  const lendingModel = LendingRepository.getLendingModel(db);

  try {
    return await lendingModel.findAll({
      where: {
        lending_user_id: lendingUserId,
        isbn: isbn,
      },
    });
  } catch (e) {
    throw e;
  }
};

/**
 * 書籍の貸し出し状況を新規登録
 *
 * @param {*} db
 * @param {*} isbn
 * @param {*} bookId
 * @param {*} lendingUserId
 * @returns {Promise<void>}
 */
module.exports.create = async function (db, isbn, bookId, lendingUserId, rentalDate, returnPlanDate, managedUserId) {
  const lendingModel = LendingRepository.getLendingModel(db);

  try {
    return await lendingModel.create({
      lending_user_id: lendingUserId,
      isbn: isbn,
      book_id: bookId,
      rental_date: rentalDate,
      managed_user_id: managedUserId,
      return_plan_date: returnPlanDate,
    });
  } catch (e) {
    throw e;
  }
};

/**
 * 書籍の貸し出し状況を削除
 *
 * @param {*} db
 * @param {*} isbn
 * @param {*} bookId
 * @param {*} lendingUserId
 * @returns Promise（成功時 resolve/失敗時 reject）
 */
module.exports.delete = async function (db, isbn, bookId, lendingUserId) {
  const lendingModel = LendingRepository.getLendingModel(db);
  try {
    return await lendingModel.destroy({
      where: {
        lending_user_id: lendingUserId,
        isbn: isbn,
        book_id: bookId,
      },
    });
  } catch (e) {
    throw e;
  }
};
