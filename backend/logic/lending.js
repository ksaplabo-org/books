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
 module.exports. reg = async function (db, isbn, book_id, userName) {
    const BookModel = BookRepository.getBookModel(db, lending);

    try {    
        return await BookModel.create({
            title : book.title,
            isbn : book.isbn,
            description : book.description ,
            imgUrl : book.imgUrl          
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