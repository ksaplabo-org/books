// Business Logic define
const AuthLogic = require("./logic/auth");
const BookLogic = require("./logic/book");
const UserLogic = require("./logic/user");
const LendingLogic = require("./logic/lending");
const InformationLogic = require("./logic/information");
const StudentLogic = require("./logic/student");

// DB Connection define
const DbUtil = require("./db/utility");
const db = DbUtil.connect();

// Express setting
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const app = express();
app.use(json());
app.use(cors());

/**
 * サインインAPI
 */
app.post("/api/sign-in", async function (req, res) {
  // リクエスト取得
  const user = req.body;

  try {
    // 検証
    const result = await AuthLogic.verify(db, user.userId, user.password);

    // 正常レスポンス
    res.send(result);
  } catch (e) {
    // 異常レスポンス
    console.log("failed to verify.", e);
    res.status(500).send("server error occur");
  }
});

/**
 * お知らせ一覧取得API
 */
app.get("/api/information", async function (req, res) {
  try {
    const info = await InformationLogic.getAll(db);
    res.send({
      Items: JSON.stringify(info),
    });
  } catch (e) {
    // 異常レスポンス
    console.log("failed to get information.", e);
    res.status(500).send("server error occur");
  }
});

/**
 * 書籍情報取得API
 */
app.get("/api/book", async function (req, res) {
  try {
    const books = await BookLogic.getAll(db);

    // 正常レスポンス
    res.send({
      Items: JSON.stringify(books),
    });
  } catch (e) {
    // 異常レスポンス
    console.log("failed to get book.", e);
    res.status(500).send("server error occur");
  }
});

/**
 * 書籍名のあいまい検索結果取得API
 */
app.get("/api/book/search/:searchWord", async function (req, res) {
  try {
    // 書籍情報を取得する
    const books = await BookLogic.getAllSearchBooks(db, req.params.searchWord);

    // 正常レスポンス
    res.send({
      Items: JSON.stringify(books),
    });
  } catch (e) {
    // 異常レスポンス
    console.log("failed to get searchBook.", e);
    res.status(500).send("server error occur");
  }
});

/**
 * 書籍情報追加API
 */
app.post("/api/book", async function (req, res) {
  // リクエスト取得
  const book = req.body;

  try {
    await BookLogic.add(db, book);

    // 正常レスポンス
    res.send({ result: "success" });
  } catch (e) {
    // 異常レスポンス
    console.log("failed to add book.", e);
    res.status(500).send("server error occur");
  }
});

/**
 * 書籍情報更新API
 */
app.put("/api/book/:operation", async function (req, res) {
  const requestBody = req.body;

  // 書籍更新する
  const isUpdateRental = req.params.operation === "rental";
  try {
    await BookLogic.updateState(db, requestBody.title, requestBody.userName, isUpdateRental);

    // 正常レスポンス
    res.send({ result: "success" });
  } catch (e) {
    // 異常レスポンス
    console.log("failed to update book status.", e);
    res.status(500).send("server error occur");
  }
});

/**
 * 書籍情報削除API
 */
app.delete("/api/book/:title", async function (req, res) {
  try {
    // 書籍削除する
    await BookLogic.remove(db, req.params.title);

    // 正常レスポンス
    res.send({ result: "success" });
  } catch (e) {
    // 異常レスポンス
    console.log("failed to remove book.", e);
    res.status(500).send("server error occur");
  }
});

/**
 * ユーザー情報取得API
 */
app.get("/api/users/:userId", async function (req, res) {
  // パスパラメータから検索条件を取得
  const userId = req.params.userId;

  try {
    const users = await UserLogic.findById(db, userId);

    // 正常レスポンス
    res.send({
      Items: JSON.stringify(users),
    });
  } catch (e) {
    // 異常レスポンス
    console.log("failed to get user.", e);
    res.status(500).send("server error occur");
  }
});

/**
 * ユーザー情報検索API
 */
app.get("/api/users", async function (req, res) {
  // クエリパラメータから検索条件を取得
  const userId = req.query.userId;
  const userName = req.query.userName;
  const address = req.query.address;
  const auth = req.query.auth;

  try {
    let users;
    if (auth != null) {
      // 権限検索
      users = await UserLogic.findByAuth(db, auth);
    } else if (userId != null || userName != null || address != null) {
      // あいまい検索
      users = await UserLogic.findByIdOrNameOrAddressLike(db, userId, userName, address);
    } else {
      // 全件検索
      users = await UserLogic.findAll(db);
    }

    // 正常レスポンス
    res.send({
      Items: JSON.stringify(users),
    });
  } catch (e) {
    // 異常レスポンス
    console.log("failed to get user.", e);
    res.status(500).send("server error occur");
  }
});

/**
 * ユーザー情報追加API
 */
app.post("/api/users", async function (req, res) {
  // リクエスト取得
  const user = req.body;

  try {
    // ユーザー情報を登録する
    await UserLogic.create(db, user.userId, user.userName, user.password, user.gender, user.auth, user.address);

    // 正常レスポンス
    res.send({});
  } catch (e) {
    // 異常レスポンス
    console.log("failed to add user.", e);
    res.status(500).send("server error occur");
  }
});

/**
 * ユーザー情報更新API
 */
app.put("/api/users", async function (req, res) {
  // リクエスト取得
  const user = req.body;

  try {
    // ユーザー情報を登録する
    await UserLogic.update(db, user.userId, user.userName, user.password, user.gender, user.auth, user.address);

    // 正常レスポンス
    res.send({});
  } catch (e) {
    // 異常レスポンス
    console.log("failed to update user.", e);
    res.status(500).send("server error occur");
  }
});

/**
 * ユーザー情報削除API
 */
app.delete("/api/users/:id", async function (req, res) {
  try {
    // ユーザー削除する
    await UserLogic.remove(db, req.params.id);

    // 正常レスポンス
    res.send({ result: "success" });
  } catch (e) {
    // 異常レスポンス
    console.log("failed to remove user.", e);
    res.status(500).send("server error occur");
  }
});

/**
 * 貸し出し状況登録API
 */
app.post("/api/lending", async function (req, res) {
  // リクエスト取得
  const lending = req.body;

  try {
    // 貸し出し状況登録
    await LendingLogic.create(
      db,
      lending.isbn,
      lending.book_id,
      lending.lending_user_id,
      lending.rental_date,
      lending.return_plan_date,
      lending.managed_user_id
    );

    // 正常レスポンス
    res.send({ result: "success" });
  } catch (e) {
    // 異常レスポンス
    console.log("failed to add lending.", e);
    res.status(500).send("server error occur");
  }
});

/**
 * 貸し出し状況削除API
 */
app.delete("/api/lending", async function (req, res) {
  // リクエスト取得
  const lending = req.body;

  try {
    // 貸し出し状況削除
    await LendingLogic.delete(db, lending.isbn, lending.book_id, lending.lending_user_id);

    // 正常レスポンス
    res.send({ result: "success" });
  } catch (e) {
    // 異常レスポンス
    console.log("failed to remove lending.", e);
    res.status(500).send("server error occur");
  }
});

/**
 * ユーザIDに紐づく貸出中の書籍情報取得API
 */
app.get("/api/lending/:userId", async function (req, res) {
  try {
    // 書籍情報を取得する
    const lendingBooks = await LendingLogic.getLendingUser(db, req.params.userId);

    // 正常レスポンス
    res.send({
      Items: JSON.stringify(lendingBooks),
    });
  } catch (e) {
    // 異常レスポンス
    console.log("failed to get lending books.", e);
    console.log(error);
    res.status(500).send("server error occur");
  }
});

/**
 * 貸し出し状況確認API
 */
app.post("/api/lending/already", async function (req, res) {
  // リクエスト取得
  const lending = req.body;

  try {
    // 貸し出し状況確認
    const result = await LendingLogic.selectAlreadyUser(db, lending.isbn, lending.lending_user_id);

    // 正常レスポンス
    res.send(result);
  } catch (e) {
    // 異常レスポンス
    console.log("failed to already lending book.", e);
    res.status(500).send("server error occur");
  }
});

app.get("/api/students", async function (req, res) {
  try {
    const students = await StudentLogic.getAll(db);

    // 正常レスポンス
    res.send({
      Items: JSON.stringify(students),
    });
  } catch (e) {
    // 異常レスポンス
    console.log("failed to get student.", e);
    res.status(500).send("server error occur");
  }
});

app.listen(process.env.PORT || 3000);
