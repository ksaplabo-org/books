const sequelize = require("sequelize");
const Op = sequelize.Op;
const moment = require("moment");

const BookRepository = require("../db/book");

/**
 * 書籍情報を全件検索
 *
 * @param {*} db
 * @returns {Promise<Object[]>}
 */
module.exports.getAll = async function (db) {
  const bookModel = BookRepository.getBookModel(db);

  try {
    return await bookModel.findAll();
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
  const bookModel = BookRepository.getBookModel(db);

  try {
    return await bookModel.findAll({
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
  const bookModel = BookRepository.getBookModel(db, book);

  try {
    return await bookModel.create({
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
 * 書籍情報を更新
 *
 * @param {*} db
 * @param {*} title
 * @param {*} isUpdateRental
 * @returns {Promise<void>}
 */
module.exports.updateState = async function (db, title, userName, isUpdateRental) {
  const bookModel = BookRepository.getBookModel(db);

  try {
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

    return await bookModel.update(updateParams, { where: { title: title } });
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
  const bookModel = BookRepository.getBookModel(db);

  try {
    return await bookModel.destroy({ where: { title: title } });
  } catch (e) {
    throw e;
  }
};
