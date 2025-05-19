// Ajax通信ライブラリ
import axios from "axios";
import UserConst from "./const/UserConst";

/**
 * SessionStrageに保持するサインユーザー情報 のキー
 */
const SIGNIN_KEY = "loginUser";

/**
 * サインイン
 *
 * @param {*} userId ユーザーID
 * @param {*} password パスワード
 * @returns
 */
export async function signIn(userId, password) {
  const url = "/api/signIn";

  const response = await axios.post(url, {
    userId: userId,
    password: password,
  });

  if (response.data.result && response.data.user !== null) {
    // SessionStrageに、サインインユーザー情報を保持する
    sessionStorage.setItem(SIGNIN_KEY, JSON.stringify(response.data.user));

    console.log("signin success.");
  }
}

/**
 * サインアウト
 */
export function signOut() {
  // SessionStrageから、サインインユーザー情報を削除する
  sessionStorage.removeItem(SIGNIN_KEY);
}

/**
 * ユーザー情報取得
 *
 * @returns サインインユーザー情報
 */
export function currentUserInfo() {
  // SessionStrageから、サインインユーザー情報を取得する
  const signinUser = sessionStorage.getItem(SIGNIN_KEY);

  //
  return signinUser === null ? null : JSON.parse(signinUser);
}

/**
 * サインイン判定
 *
 * @returns サインイン有無
 */
export function isSignIn() {
  return currentUserInfo() !== null;
}

/**
 * 管理者判定
 * @returns 管理者かどうか (true:管理者 false:一般)
 */
export function isAdmin() {
  const userInfo = currentUserInfo();
  return userInfo !== null && userInfo.auth === UserConst.Auth.admin;
}
