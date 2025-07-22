// Business Logic define
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
  // リクエストボディ取得
  const reqBody = req.body;

  let resBody = null;
  let status = 200;
  try {
    const user = await UserLogic.findById(db, reqBody.userId);
    if (user == null || user.password !== reqBody.password) {
      // 認証失敗として401エラーを設定
      status = 401;
    } else {
      // 認証成功としてレスポンスボディを設定
      resBody = {
        userId: user.user_id,
        userName: user.user_name,
        auth: user.auth,
      };
    }
  } catch (e) {
    // 異常レスポンス
    console.log("failed to verify user.", e);
    status = 500;
  }
  res.status(status).send(resBody);
});

/**
 * お知らせ一覧取得API
 */
app.get("/api/information", async function (req, res) {
  try {
    const info = await InformationLogic.getAll(db);

    // 正常レスポンス
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
  // リクエストボディを取得
  const reqBody = req.body;

  try {
    await BookLogic.add(db, reqBody.isbn, reqBody.book_id, reqBody.title, reqBody.description, reqBody.img_url);

    // 正常レスポンス
    res.send();
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
  // リクエストボディを取得
  const reqBody = req.body;

  const isUpdateRental = req.params.operation === "rental";
  try {
    await BookLogic.updateState(db, reqBody.title, reqBody.userName, isUpdateRental);

    // 正常レスポンス
    res.send();
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
    await BookLogic.remove(db, req.params.title);

    // 正常レスポンス
    res.send();
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
  try {
    const users = await UserLogic.findById(db, req.params.userId);

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
  const query = req.query;
  const userId = query.userId;
  const userName = query.userName;

  try {
    let users;
    if ((userId != null && userId !== "") || (userName != null && userName !== "")) {
      // あいまい検索
      users = await UserLogic.findByIdOrNameLike(db, userId, userName);
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
  // リクエストボディを取得
  const reqBody = req.body;

  try {
    await UserLogic.create(db, reqBody.userId, reqBody.userName, reqBody.password, reqBody.gender, reqBody.auth);

    // 正常レスポンス
    res.send();
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
  /**
   * ★問題3[ユーザー管理] Start★
   * 更新処理を呼び出せるように処理を記載する。
   * ※ユーザー情報追加API(app.post("/api/users", function(req, res))を参照
   *
   * ユーザー更新処理は「UserLogic.update」処理を呼び出して実行する。
   */
  const reqBody = req.body;
  try {
    await UserLogic.update(db, reqBody.userId, reqBody.userName, reqBody.password, reqBody.gender, reqBody.auth);

    // 正常レスポンス
    res.send();
  } catch (e) {
    // 異常レスポンス
    console.log("failed to update user.", e);
    res.status(500).send("server error occur");
  }
  /**★問題3[ユーザー管理] End★*/
});

/**
 * ユーザー情報削除API
 */
app.delete("/api/users/:id", async function (req, res) {
  try {
    await UserLogic.remove(db, req.params.id);

    // 正常レスポンス
    res.send();
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
  // リクエストボディを取得
  const reqBody = req.body;

  try {
    await LendingLogic.create(
      db,
      reqBody.isbn,
      reqBody.book_id,
      reqBody.lending_user_id,
      reqBody.rental_date,
      reqBody.return_plan_date,
      reqBody.managed_user_id
    );

    // 正常レスポンス
    res.send();
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
  // リクエストボディを取得
  const reqBody = req.body;

  try {
    await LendingLogic.delete(db, reqBody.isbn, reqBody.book_id, reqBody.lending_user_id);

    // 正常レスポンス
    res.send();
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
    const lendingBooks = await LendingLogic.getLendingUser(db, req.params.userId);

    // 正常レスポンス
    res.send({
      Items: JSON.stringify(lendingBooks),
    });
  } catch (e) {
    // 異常レスポンス
    console.log("failed to get lending books.", e);
    res.status(500).send("server error occur");
  }
});

/**
 * 貸し出し状況確認API
 */
app.post("/api/lending/already", async function (req, res) {
  // リクエストボディを取得
  const reqBody = req.body;

  try {
    const result = await LendingLogic.selectAlreadyUser(db, reqBody.isbn, reqBody.lending_user_id);

    // 正常レスポンス
    res.send(result);
  } catch (e) {
    // 異常レスポンス
    console.log("failed to already lending book.", e);
    res.status(500).send("server error occur");
  }
});

/**
 * 学生情報検索API
 */
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

/**
 * お知らせ情報追加API
 */
app.post("/api/information", async function (req, res) {
  // リクエストボディを取得
  const reqBody = req.body;

  try {
    await InformationLogic.create(db, reqBody.title, reqBody.content);

    // 正常レスポンス
    res.send();
  } catch (e) {
    // 異常レスポンス
    console.log("failed to add information.", e);
    res.status(500).send("server error occur");
  }
});

/**
 * お知らせ情報削除API
 */
app.delete("/api/information/:no", async function (req, res) {
  try {
    await InformationLogic.remove(db, req.params.no);

    // 正常レスポンス
    res.send();
  } catch (e) {
    // 異常レスポンス
    console.log("failed to remove information.", e);
    res.status(500).send("server error occur");
  }
});

/**
 * お知らせ情報更新API
 */
app.put("/api/information", async function (req, res) {
  const reqBody = req.body;
  try {
    await InformationLogic.update(db, reqBody.no, reqBody.title, reqBody.content);

    // 正常レスポンス
    res.send();
  } catch (e) {
    // 異常レスポンス
    console.log("failed to update user.", e);
    res.status(500).send("server error occur");
  }
});

app.listen(process.env.PORT || 3000);
