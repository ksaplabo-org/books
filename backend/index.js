// Bussiness Logic define
const AuthLogic = require("./logic/auth");
const BookLogic = require("./logic/book");
const  UserLogic = require("./logic/user");

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

    // 本当はこのあたりでパラメータチェック

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
 * 書籍情報取得API
 */
app.get("/api/book", function(req, res) {
    // リクエスト取得

    // 書籍取得する
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

    // 本当はこのあたりでパラメータチェック

    // 書籍追加する
    BookLogic.add(db, book)
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
 * 書籍情報更新API
 */
app.put("/api/book/:operation", function(req, res) {
    const requestBody = req.body;

    // 本当はこのあたりでパラメータチェック

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

app.get("/api/user", function(req, res) {
    // ユーザー取得する
    UserLogic.getAll(db)
        .then((users) => {
            // 正常レスポンス
            res.send(users);
        })
        .catch(()  => {
            // 異常レスポンス
            console.log("failed to get all book");
            res.status(500).send("server error occur")
        });
});

app.post("/api/user", function(req, res) {
    // リクエスト取得
    const user = req.body;

    // ユーザー情報を登録する
    UserLogic.create(db, user.userId, user.userName, user.password , user.gender , user.userAuth )
        .then(() => {
            // 正常レスポンス
            res.send({});
        })
        .catch(()  => {
            // 異常レスポンス
            console.log("failed to get all user");
            res.status(500).send("server error occur")
        });
});

app.put("/api/user", function(req, res) {
    // リクエスト取得
    const user = req.body;

    // ユーザー情報を登録する
    UserLogic.update(db, user.userId, user.userName, user.password , user.gender)
        .then(() => {
            // 正常レスポンス
            res.send({});
        })
        .catch(()  => {
            // 異常レスポンス
            console.log("failed to user update");
            res.status(500).send("server error occur")
        });
});

app.delete("/api/user/:userId", function(req, res) {
    console.log(db)

    // ユーザー削除する
    UserLogic.remove(db, req.params.userId)
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
 * ユーザ名に紐づく書籍情報取得API
 */
 app.get("/api/book/:userName", function(req, res) {
    // 書籍取得する
    BookLogic.getLinkUser(db, req.params.userName)
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
 * 貸し出し状況登録API
 */
 app.post("/api/lending", function(req, res) {
    // リクエスト取得
    const book = req.body;

    // 本当はこのあたりでパラメータチェック

    // 貸し出し状況登録
    LendingLogic.reg(db, book)
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

app.listen(process.env.PORT || 3000);
