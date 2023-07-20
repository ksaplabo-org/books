// Bussiness Logic define
const AuthLogic = require("./logic/auth");
const BookLogic = require("./logic/book");
const UserLogic = require("./logic/user");
const LendingLogic = require("./logic/lending");
const InformationLogic = require("./logic/information");

// DB Connection define
const DbUtil  = require("./db/utility");
const db = DbUtil.connect();

// Express setting
const  express  = require("express");
const  { json }  = require("body-parser");
const cors  = require("cors");
const app = express();
app.use(json())
app.use(cors())

/**
 * サインインAPI
 */
app.post("/api/signIn", function(req, res) {
    // リクエスト取得
    const user = req.body;

    // 検証する
    AuthLogic.verify(db, user.userId, user.password)
        .then((result) => {
            // 正常レスポンス
            res.send(result);
        })
        .catch(()=>{
            // 異常レスポンス
            console.log("failed to verify");
            res.status(500).send("server error occur")
        });
});

/**
 * お知らせ一覧取得API
 */
app.get("/api/information", function(req, res) {
    InformationLogic.getAll(db)
        .then((information) => {
            // 正常レスポンス
            res.send({
                Items: JSON.stringify(information)
            });
        })
        .catch(() => {
            // 異常レスポンス
            console.log("failed to get information");
            res.status(500).send("server error occur");
        });
});

/**
 * 書籍情報取得API
 */
app.get("/api/book", function(req, res) {
    BookLogic.getAll(db)
        .then((books) => {
            // 正常レスポンス
            res.send({
                Items: JSON.stringify(books)
            });
        })
        .catch(()  => {
            // 異常レスポンス
            console.log("failed to get book");
            res.status(500).send("server error occur")
        });
});

/**
 * 書籍情報追加API
 */
app.post("/api/book", function(req, res) {
    // リクエスト取得
    const book = req.body;

    // 書籍追加する
    BookLogic.add(db, book)
        .then(() => {
            // 正常レスポンス
            res.send({result: "success"});
        })
        .catch(()  => {
            // 異常レスポンス
            console.log("failed to add book");
            res.status(500).send("server error occur")
        });
});

/**
 * 書籍情報更新API
 */
app.put("/api/book/:operation", function(req, res) {
    const requestBody = req.body;

    // 書籍更新する
    const isUpdateRental = (req.params.operation === "rental");
    BookLogic.updateState(db, requestBody.title, requestBody.userName, isUpdateRental)
        .then(() => {
            // 正常レスポンス
            res.send({result: "success"});
        })
        .catch((error)  => {
            // 異常レスポンス
            console.log("failed to update book status"+error);
            res.status(500).send("server error occur")
        });
});

/**
 * 書籍情報削除API
 */
app.delete("/api/book/:title", function(req, res) {
    // 本当はこのあたりでパラメータチェック

    // 書籍削除する
    BookLogic.remove(db, req.params.title)
        .then(() => {
            // 正常レスポンス
            res.send({result: "success"});
        })
        .catch(()  => {
            // 異常レスポンス
            console.log("failed to remove book");
            res.status(500).send("server error occur")
        });
});

/**
 * ユーザー情報一覧取得API
 */
app.get("/api/users", function(req, res) {
    // ユーザー取得する
    UserLogic.getAll(db)
        .then((users) => {
            // 正常レスポンス
            res.send({
                Items: JSON.stringify(users)
            });
        })
        .catch(()  => {
            // 異常レスポンス
            console.log("failed to get all user");
            res.status(500).send("server error occur")
        });
});

/**
 * ユーザー情報取得API
 *   ユーザーIDで検索
 */
app.get("/api/users/:id", function(req, res) {
    // ユーザー情報を取得する
    UserLogic.findById(db, req.params.id)
        .then((user) => {
            // 正常レスポンス
            res.send({
                Items: JSON.stringify(user)
            });
        })
        .catch(()  => {
            // 異常レスポンス
            console.log("failed to get user");
            res.status(500).send("server error occur")
        });
});

/**
 * ユーザー情報取得API
 *   ユーザーID、ユーザー名の部分一致検索
 */
 app.get("/api/users/search/:word", function(req, res) {

    // ユーザー情報を取得する
    UserLogic.findByIncludeIdOrName(db, req.params.word)
        .then((books) => {
            // 正常レスポンス
            res.send({
                Items: JSON.stringify(books)
            });
        })
        .catch(()  => {
            // 異常レスポンス
            console.log("failed to get user");
            res.status(500).send("server error occur")
        });
});

/**
 * ユーザー情報追加API
 */
app.post("/api/users", function(req, res) {
    // リクエスト取得
    const user = req.body;

    // ユーザー情報を登録する
    UserLogic.create(db, user.userId, user.userName, user.password , user.gender , user.auth)
        .then(() => {
            // 正常レスポンス
            res.send({});
        })
        .catch(()  => {
            // 異常レスポンス
            console.log("failed to add user");
            res.status(500).send("server error occur")
        });
});

/**
 * ユーザー情報更新API
 */
app.put("/api/users", function(req, res) {
    // リクエスト取得
    const user = req.body;

    // ユーザー情報を登録する
    UserLogic.update(db, user.userId, user.userName, user.password , user.gender, user.auth)
        .then(() => {
            // 正常レスポンス
            res.send({});
        })
        .catch(()  => {
            // 異常レスポンス
            console.log("failed to update user");
            res.status(500).send("server error occur")
        });
});

/**
 * ユーザー情報削除API
 */
app.delete("/api/users/:id", function(req, res) {
    console.log(db)

    // ユーザー削除する
    UserLogic.remove(db, req.params.id)
        .then(() => {
            // 正常レスポンス
            res.send({result: "success"});
        })
        .catch(()  => {
            // 異常レスポンス
            console.log("failed to remove user");
            res.status(500).send("server error occur")
        });
});

/**
 * 貸し出し状況登録API
 */
 app.post("/api/lending", function(req, res) {
    // リクエスト取得
    const lending = req.body;

    // 貸し出し状況登録
    LendingLogic.create(db, lending.isbn, lending.book_id, lending.lending_user_id, lending.rental_date, lending.return_plan_date, lending.managed_user_id)
        .then((books) => {
            // 正常レスポンス
            res.send({result: "success"});
        })
        .catch(()  => {
            // 異常レスポンス
            console.log("failed to add lending");
            res.status(500).send("server error occur")
        });
});

/**
 * 貸し出し状況削除API
 */
 app.delete("/api/lending", function(req, res) {
    // リクエスト取得
    const lending = req.body;

    // 貸し出し状況削除
    LendingLogic.delete(db, lending.isbn, lending.book_id, lending.lending_user_id)
        .then((books) => {
            // 正常レスポンス
            res.send({result: "success"});
        })
        .catch((error)  => {
            // 異常レスポンス
            console.log("failed to add book");
            res.status(500).send("server error occur")
        });
});

/**
 * ユーザIDに紐づく貸出中の書籍情報取得API
 */
 app.get("/api/lending/:userId", function(req, res) {
    // 書籍情報を取得する
    LendingLogic.getLendingUser(db, req.params.userId)
        .then((lendingBooks) => {
            console.log(lendingBooks);
            // 正常レスポンス
            res.send({
                Items: JSON.stringify(lendingBooks)
            });
        })
        .catch((error)  => {
            // 異常レスポンス
            console.log("failed to get lending books");
            console.log(error);
            res.status(500).send("server error occur");
        });
});

/**
 * 書籍名のあいまい検索結果取得API
 */
 app.get("/api/book/search/:searchWord", function(req, res) {

    // 書籍情報を取得する
    BookLogic.getAllSearchBooks(db, req.params.searchWord)
        .then((books) => {
            // 正常レスポンス
            res.send({
                Items: JSON.stringify(books)
            });
        })
        .catch(()  => {
            // 異常レスポンス
            console.log("failed to get searchBook");
            res.status(500).send("server error occur")
        });
});

/**
 * 貸し出し状況確認API
 */
 app.post("/api/lending/already", function(req, res) {
    // リクエスト取得
    const lending = req.body;

    // 貸し出し状況確認
    LendingLogic.selectAlreadyUser(db, lending.isbn, lending.lending_user_id)
        .then((result) => {
            // 正常レスポンス
            res.send(result);
        })
        .catch((error)  => {
            // 異常レスポンス
            console.log("failed to already lending book");
            res.status(500).send("server error occur")
        });
});

app.listen(process.env.PORT || 3000);
