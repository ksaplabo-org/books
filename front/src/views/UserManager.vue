<template>
  <div>
    <NaviMenu />

    <div id="wrapper">
      <Menu />

      <div id="content-wrapper" class="bg-light">
        <div class="container-fluid">
          <!-- パンくずリスト -->
          <ol class="breadcrumb" id="breadcrumb">
            <li class="breadcrumb-item">
              <router-link tag="a" :to="{ name: 'top' }">トップページ</router-link>
            </li>
            <li class="breadcrumb-item" id="breadcrumb-u-list">
              <router-link tag="a" :to="{ name: 'userList' }">ユーザー一覧</router-link>
            </li>
            <li class="breadcrumb-item active">ユーザー管理</li>
          </ol>

          <p class="text-primary" v-show="msg">{{ msg }}</p>
          <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

          <br />

          <form @submit.stop.prevent="userUpdate" method="post">
            <div class="row">
              <div class="col" />
              <div class="col-6">
                <!--
                    ★問題1 Start★
                    ユーザーIDを編集できないようにする。
                    ※inputタグの文末に何か追加する。
                -->
                <!-- ユーザーID -->
                <div class="form-group">
                  <label>ユーザーID</label>
                  <input
                    type="text"
                    id="userId"
                    class="form-control"
                    placeholder="1桁以上16桁以下で入力してください。"
                    v-model="userId"
                    autocomplete="off"
                    disabled="true"
                  />
                </div>
                <!--★問題1 End★-->

                <!-- ユーザー名 -->
                <div class="form-group">
                  <label>ユーザー名</label>
                  <input
                    type="text"
                    id="userName"
                    class="form-control"
                    placeholder="100桁以下で入力してください。"
                    v-model="userName"
                    autocomplete="off"
                  />
                </div>
                <!-- パスワード -->
                <div class="form-group">
                  <label>パスワード</label>
                  <div class="row">
                    <div class="col">
                      <input
                        :type="inputType"
                        id="inputPassword"
                        class="form-control"
                        placeholder="8桁以上16桁以下で入力してください。"
                        v-model="password"
                      />
                    </div>
                    <div class="col">
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        id="toggle-password"
                        v-on:click="changeVisible"
                      >
                        👀
                      </button>
                    </div>
                  </div>
                </div>

                <!-- パスワード再入力 -->
                <div class="form-group">
                  <label>パスワード(再入力)</label>
                  <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="8桁以上16桁以下で入力してください。"
                    v-model="confirmPassword"
                    :disabled="originPassword == password"
                  />
                </div>

                <!-- 性別 -->
                <div class="form-group">
                  <label>性別</label>
                  <br />
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="womanRadio"
                      name="genderRadio"
                      class="custom-control-input"
                      v-model="gender"
                      v-bind:value="woman"
                      checked
                    />
                    <label class="custom-control-label" for="womanRadio">女性</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="manRadio"
                      name="genderRadio"
                      class="custom-control-input"
                      v-model="gender"
                      v-bind:value="man"
                    />
                    <label class="custom-control-label" for="manRadio">男性</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="unknownRadio"
                      name="genderRadio"
                      class="custom-control-input"
                      v-model="gender"
                      v-bind:value="unknown"
                    />
                    <label class="custom-control-label" for="unknownRadio">非公開</label>
                  </div>
                </div>

                <!-- 権限 -->
                <div class="form-group">
                  <label>権限</label>
                  <br />
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="generalRadio"
                      name="authRadio"
                      class="custom-control-input"
                      v-model="auth"
                      v-bind:value="general"
                      checked
                    />
                    <label class="custom-control-label" for="generalRadio">一般</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="adminRadio"
                      name="authRadio"
                      class="custom-control-input"
                      v-model="auth"
                      v-bind:value="admin"
                    />
                    <label class="custom-control-label" for="adminRadio">社員</label>
                  </div>
                </div>

                <!-- 住所 -->
                <div class="form-group">
                  <label>住所</label>
                  <input
                    type="text"
                    id="address"
                    class="form-control"
                    placeholder="150桁以下で入力してください。"
                    v-model="address"
                  />
                </div>

                <!-- 更新・削除ボタン -->
                <div class="form-group d-flex justify-content-center">
                  <div class="p-2 w-50">
                    <input class="btn btn-primary btn-block" type="submit" value="情報更新" />
                  </div>
                  <div class="p-2 w-50">
                    <b-button class="btn-danger btn-block" data-toggle="modal" data-target="#deleteConfirmModal"
                      >ユーザー削除</b-button
                    >
                  </div>
                </div>
              </div>
              <div class="col" />
            </div>
          </form>
        </div>
        <Footer />
      </div>

      <!-- 削除確認モーダル -->
      <div
        class="modal fade"
        id="deleteConfirmModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="myModalLabel">確認</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>削除してよろしいですか？</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="userDelete()">削除</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- スクロールトップボタン -->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

    <!-- ローディングマスク -->
    <loading v-if="isLoading === true" />
  </div>
</template>

<script>
import * as UserUtil from "@/utils/UserUtil";
import * as AjaxUtil from "@/utils/AjaxUtil";
import UserConst from "@/utils/const/UserConst";
// 共通
import NaviMenu from "../components/NaviMenu.vue";
import "../utils/sb-admin";
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";
import Loading from "../components/Loading.vue";
export default {
  props: ["flashMsg", "flashErrMsg"],
  components: { NaviMenu, Menu, Footer, Loading },
  data() {
    return {
      msg: "",
      errMsg: "",
      isUnavaliable: true,
      inputType: "password",
      isLoading: false,
      // 各項目初期値
      userId: "",
      userName: "",
      originPassword: "",
      password: "",
      confirmPassword: "",
      gender: "",
      auth: "",
      address: "",
      // 各ラジオボタン設定値
      man: UserConst.Gender.man,
      woman: UserConst.Gender.woman,
      unknown: UserConst.Gender.unknown,
      general: UserConst.Auth.general,
      admin: UserConst.Auth.admin,
    };
  },
  async mounted() {
    try {
      // サインイン確認
      if (UserUtil.isSignIn()) {
        // 画面更新
        await this.updateView();

        // メッセージ設定
        this.msg = this.flashMsg;
        this.errMsg = this.flashErrMsg;
      } else {
        this.$router.push({ name: "signIn", params: { flashMsg: "サインインしてください" } });
      }
    } catch (e) {
      this.errMsg = e.message;
    }
  },
  methods: {
    /**
     * 画面更新
     */
    updateView: async function () {
      this.isLoading = true;
      this.msg = "";
      this.errMsg = "";
      // クエリストリングを取得
      const query = this.$route.query;

      // 編集対象のユーザーIDを設定する
      this.userId = query.userId ? query.userId : UserUtil.currentUserInfo().userId;

      // サインインユーザーが更新対象の場合
      if (this.userId == UserUtil.currentUserInfo().userId) {
        // 権限の編集不可設定
        for (let radio of document.getElementsByName("authRadio")) {
          radio.disabled = true;
        }
      }

      // パンくずリストを編集
      if (!query.userId) {
        // クエリストリングがない = メニューから直接遷移
        const ol = document.getElementById("breadcrumb");
        const li = document.getElementById("breadcrumb-u-list");
        ol.removeChild(li);
      }

      try {
        // ユーザーIDからユーザー情報を取得
        const response = await AjaxUtil.getUserById(this.userId);
        const userInfo = JSON.parse(response.data.Items);

        // ユーザー情報を各項目にセット
        this.userName = userInfo.user_name;
        this.password = userInfo.password;
        this.originPassword = userInfo.password;
        this.gender = userInfo.gender;
        this.auth = userInfo.auth;
        this.address = userInfo.address;
      } catch (e) {
        this.msg = "";
        this.errMsg = "ユーザー取得に失敗しました";
        console.log(e);
      }

      this.isLoading = false;
    },

    /**
     * ユーザー更新
     */
    userUpdate: async function () {
      // メッセージ初期化
      this.msg = "";
      this.errMsg = "";
      this.isLoading = true;

      try {
        // 入力チェック
        if (this.userName == null || this.userName === "") {
          this.errMsg = "ユーザー名を入力してください";
          return;
        }
        if (this.userName.length > 100) {
          this.errMsg = "ユーザー名は100桁以下で入力してください";
          return;
        }
        if (this.password == null || this.password === "") {
          this.errMsg = "パスワードを入力してください";
          return;
        }
        if (this.password.length < 8 || this.password.length > 16) {
          this.errMsg = "パスワードは8桁以上16桁以下で入力してください";
          return;
        }
        if (!this.password.match("^[0-9A-Za-z]{8,16}$")) {
          this.errMsg = "パスワードは半角英数で入力してください";
          return;
        }
        //  元のパスワードと入力されたパスワードが違う場合のみ実行
        if (this.password != this.originPassword) {
          if (this.confirmPassword.length < 8 || this.confirmPassword.length > 16) {
            this.errMsg = "パスワード(再確認)は8桁以上16桁以下で入力してください";
            return;
          }
          if (!this.confirmPassword.match("^[0-9A-Za-z]{8,16}$")) {
            this.errMsg = "パスワード(再確認)は半角英数で入力してください";
            return;
          }
          if (this.password != this.confirmPassword) {
            this.errMsg = "パスワードとパスワード(再確認)が一致しません";
            return;
          }
        }
        if (this.gender == null || this.gender === "") {
          this.errMsg = "性別を選択してください";
          return;
        }
        if (this.auth == null || this.auth === "") {
          this.errMsg = "権限を選択してください";
          return;
        }
        if (this.address.length > 150) {
          this.errMsg = "住所は150桁以下で入力してください";
          return;
        }

        // 引数格納
        const model = {
          userId: this.userId,
          userName: this.userName,
          password: this.password,
          gender: this.gender,
          auth: this.auth,
          address: this.address,
        };

        await AjaxUtil.putUser(model);
        this.originPassword = this.password;
        this.confirmPassword = "";
        this.isUnavaliable = true;
        this.msg = "ユーザー更新に成功しました";
      } catch (e) {
        this.msg = "";
        this.errMsg = "ユーザー更新に失敗しました";
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * ユーザー削除
     */
    userDelete: async function () {
      // メッセージ初期化
      this.msg = "";
      this.errMsg = "";

      this.isLoading = true;

      try {
        // 削除
        await AjaxUtil.deleteUser(this.userId);

        // サインインユーザーが削除された場合
        if (this.userId == UserUtil.currentUserInfo().userId) {
          // サインアウト
          UserUtil.signOut();
          this.$router.push({ name: "signIn", params: { flashMsg: "サインインしてください" } });
        } else {
          // 一覧画面に遷移する
          this.$router.push({ name: "userList", params: { flashMsg: "削除に成功しました" } });
        }
      } catch (e) {
        this.msg = "";
        this.errMsg = "ユーザー削除に失敗しました";
        console.log(e);
      }

      this.isLoading = false;
    },


    /**
     * パスワードの内容の可視、不可視の切り替え
     */
    changeVisible: async function () {
      let currentInputtype = document.getElementById("inputPassword");

      if (currentInputtype.type == "password") {
        this.inputType = "text";
      } else {
        this.inputType = "password";
      }
    },
  },
};
</script>
