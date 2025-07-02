import * as AjaxUtil from "@/utils/AjaxUtil";
import UserConst from "./const/UserConst";

/**
 * SessionStorageに保持するサインインユーザー情報 のキー
 */
const SIGN_IN_KEY = "signInUser";

/**
 * サインイン
 *
 * @param {*} userId ユーザーID
 * @param {*} password パスワード
 * @returns
 */
export async function signIn(userId, password) {
  const response = await AjaxUtil.signIn(userId, password);

  if (response.data.result && response.data.user !== null) {
    // SessionStorageに、サインインユーザー情報を保持する
    sessionStorage.setItem(SIGN_IN_KEY, JSON.stringify(response.data.user));

    console.log("signin success.");
  }
}

/**
 * サインアウト
 */
export function signOut() {
  // SessionStorageから、サインインユーザー情報を削除する
  sessionStorage.removeItem(SIGN_IN_KEY);
}

/**
 * ユーザー情報取得
 *
 * @returns サインインユーザー情報
 */
export function currentUserInfo() {
  // SessionStorageから、サインインユーザー情報を取得する
  const signInUser = sessionStorage.getItem(SIGN_IN_KEY);
  return signInUser === null ? null : JSON.parse(signInUser);
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
