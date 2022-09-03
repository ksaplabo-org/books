// moment import
const moment = require("moment");
const LendingRepository = require("../db/lending");
const BookRepository = require("../db/book");

/**
 * 書籍の貸し出し状況を登録する
 *
 * @param {*} db 
 * @param {*} book 
 * @returns Promise（成功時 resolve/失敗時 reject）
 */
 module.exports.create = async function (db, isbn, bookId, lendingUserId) {
    const LendingModel = LendingRepository.getLendingModel(db);
    try {    
        return await LendingModel.create({
            lendingUserId : lendingUserId,
            isbn : isbn,
            bookId : bookId,
            rentalDate : "2022/09/03",
            managedUserId : "intern02",
            returnPlanDate : "2022/09/17",    
            returnActDate : null
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
    /*const LendingAndBookModel = LendingAndBookRepository.getLendingModel(db);*/

    try {
        return await LendingModel.findAll({ where: { lending_user_id: userId  },raw: true, include: [{model: BookModel,required: false}]});
    } catch (error) {
        console.log(error);
        throw error;
    }
}