// Bussiness Logic define
const AuthLogic = require("./logic/auth");
const BookLogic = require("./logic/book");

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

app.listen(process.env.PORT || 3000);
