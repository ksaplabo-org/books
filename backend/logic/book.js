// moment import
const moment = require("moment");
const BookRepository = require("../db/book");

/**
 * 書籍情報を全件検索
 *
 * @param {*} db
 * @returns {Promise<Object[]>}
 */
module.exports.getAll = async function (db) {
  const BookModel = BookRepository.getBookModel(db);

  try {
    return await BookModel.findAll();
  } catch (e) {
    throw e;
  }
};

/**
 * 書籍情報を検索
 *
 * [検索条件]
 * 書籍名の部分一致
 *
 * @param {*} db
 * @param {*} searchWord
 * @returns {Promise<Object[]>}
 */
module.exports.getAllSearchBooks = async function (db, searchWord) {
  const BookModel = BookRepository.getBookModel(db);
  const Sequelize = require("sequelize");
  const Op = Sequelize.Op;

  try {
    return await BookModel.findAll({
      where: {
        title: {
          [Op.like]: "%" + searchWord + "%",
        },
      },
    });
  } catch (e) {
    throw e;
  }
};

/**
 * 書籍情報を新規登録
 *
 * @param {*} db
 * @param {*} isbn
 * @param {*} bookId
 * @param {*} title
 * @param {*} description
 * @param {*} imgUrl
 * @returns {Promise<void>}
 */
module.exports.add = async function (db, isbn, bookId, title, description, imgUrl) {
  const BookModel = BookRepository.getBookModel(db, book);

  try {
    return await BookModel.create({
      isbn: isbn,
      book_id: bookId,
      title: title,
      description: description,
      img_url: imgUrl,
    });
  } catch (e) {
    throw e;
  }
};

/**
 * 書籍の状態を更新
 *
 * @param {*} db
 * @param {*} title
 * @param {*} isUpdateRental
 * @returns {Promise<void>}
 */
module.exports.updateState = async function (db, title, userName, isUpdateRental) {
  const BookModel = BookRepository.getBookModel(db);

  try {
    // set update parameter
    const updateParams = {
      rentalStatus: null,
      rentalDate: null,
      returnDate: null,
      rentalUser: null,
    };

    if (isUpdateRental) {
      updateParams.rentalStatus = "貸出中";
      updateParams.rentalDate = moment().format("YYYY/MM/DD");
      updateParams.returnDate = moment().add(2, "w").format("YYYY/MM/DD");
      updateParams.rentalUser = userName;
    }

    // set filter parametero
    const filter = { where: { title: title } };

    return await BookModel.update(updateParams, filter);
  } catch (e) {
    throw e;
  }
};

/**
 * 書籍情報を削除
 *
 * @param {*} db
 * @param {*} title
 * @returns {Promise<void>}
 */
module.exports.remove = async function (db, title) {
  const BookModel = BookRepository.getBookModel(db);

  try {
    return await BookModel.destroy({ where: { title: title } });
  } catch (e) {
    throw e;
  }
};
