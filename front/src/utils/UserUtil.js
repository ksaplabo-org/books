// Ajax通信ライブラリ
import axios from 'axios';
import UserConst from './const/UserConst';

/**
 * サインイン
 *
 * @param {*} userId ユーザーID
 * @param {*} password パスワード
 * @returns 
 */
export function signIn(userId, password) {
  const url = '/api/signIn';

  return axios.post(url, {
      userId: userId, 
      password: password
    })
    .then(response => {
      if (response.data.result && response.data.user !== null) {
        console.log("login");
        sessionStorage.setItem("loginUser", JSON.stringify(response.data.user));
      }
    });
}

/**
 * サインアウト
 */
export function signOut() {
  sessionStorage.removeItem("loginUser");
}

/**
 * ユーザー情報取得
 *
 * @returns サインインユーザー情報
 */
export function currentUserInfo() {
  let loginUser = sessionStorage.getItem("loginUser");
  if (loginUser === null) {
    return null;
  } else {
    return JSON.parse(loginUser);
  }
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
  if (userInfo === null) {
    return false;
  }
  return userInfo.auth === UserConst.Auth.admin;
}
