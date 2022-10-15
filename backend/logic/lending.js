// moment import
const moment = require("moment");
const LendingRepository = require("../db/lending");
const BookRepository = require("../db/book");

/**
 * 書籍の貸し出し状況を登録する
 *
 * @param {*} db 
 * @param {*} isbn 
 * @param {*} bookId 
 * @param {*} lendingUserId 入力されたユーザID 
 * @returns Promise（成功時 resolve/失敗時 reject）
 */
 module.exports.create = async function (db, isbn, bookId, lendingUserId, rentalDate, returnPlanDate, managedUserId) {
    const LendingModel = LendingRepository.getLendingModel(db);

    try {
        return await LendingModel.create({
            lending_user_id : lendingUserId,
            isbn : isbn,
            book_id : bookId,
            rental_date : rentalDate,
            managed_user_id : managedUserId,
            return_plan_date : returnPlanDate
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * 書籍の貸し出し状況を削除する
 *
 * @param {*} db 
 * @param {*} isbn 
 * @param {*} bookId 
 * @param {*} lendingUserId 入力されたユーザID 
 * @returns Promise（成功時 resolve/失敗時 reject）
 */
 module.exports.delete = async function (db, isbn, bookId, lendingUserId) {
    const LendingModel = LendingRepository.getLendingModel(db);
    try {
        return await LendingModel.destroy({
            where: {
                lending_user_id: lendingUserId,
                isbn : isbn,
                book_id : bookId
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * ユーザーIDに紐づく貸出中の書籍情報を取得する
 * @param {*} db 
 * @param {*} userId
 * @returns ユーザーIDに紐づく貸出中の書籍情報（Promise）
 */
 module.exports.getLendingUser = async function (db, userId) {
    const LendingModel = LendingRepository.getLendingModel(db);
    const BookModel = BookRepository.getBookModel(db);

    const Model = {};
    Model.Book = BookModel;
    Model.Lending = LendingModel;

    Object.keys(Model).forEach((key) => {
        const model = Model[key];
        if(model.associate) {
            model.associate(Model);
        }
    });

    try {
        return await LendingModel.findAll({
            where: {
                lending_user_id: userId
            },
            raw: true,
            include: [{
                model: BookModel,
                required: true
            }]
        });    
    } catch (error) {
        console.log(error);
        throw error;
    }
}