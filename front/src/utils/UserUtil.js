// Ajax通信ライブラリ
import axios from 'axios';

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
 * @returns ログインユーザー情報
 */
export function currentUserInfo() {
  let loginUser = sessionStorage.getItem("loginUser");
  console.log(loginUser);
  if (loginUser === null) {
    return null;
  } else {
    return JSON.parse(loginUser);
  }
}

/**
 * ログイン判定
 * 
 * @returns ログイン有無
 */
export function isSignIn() {
  return currentUserInfo() !== null;
}
