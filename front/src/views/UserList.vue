<template>
  <div>
    <NaviMenu />

    <div id="wrapper">
      <Menu />

      <div id="content-wrapper" class="bg-light">
        <div class="container-fluid">
          <!-- パンくずリスト-->
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link tag="a" :to="{ name: 'top' }">トップページ</router-link>
            </li>
            <li class="breadcrumb-item active">ユーザー一覧</li>
          </ol>

          <p class="text-primary" v-show="msg">{{ msg }}</p>
          <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

            <!--
                ★ 問題1 Start★
                  検索欄上部の文言を設計書通りに変更する。
                  検索ボタンをクリックした際に検索処理を呼び出すようにする。

                  divタグ：特に単体では意味をなさない。
                          タグで囲んだ部分をグループ化することができる。
                  function() {}：何もしてない処理。

          -->
            <div class="card mb-4">
              <div class="card-header py-3">
                <div class="form-group" id="card">
                  <div class="px-2" style="font-size: 10pt">検索方法を選択</div>
                  <br />
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="anySearch"
                      name="any"
                      class="custom-control-input"
                      v-model="search"
                      v-bind:value="anySearch"
                      methodCheck="1"
                      v-on:click="initRadioButton()"
                      chacked
                    />
                    <label class="custom-control-label" for="anySearch" style="font-size: 10pt"
                      >ID/名前/住所で検索</label
                    >
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="authSearch"
                      name="auth"
                      class="custom-control-input"
                      v-model="search"
                      v-bind:value="authSearch"
                      methodCheck="2"
                      v-on:click="initRadioButton()"
                    />
                    <label class="custom-control-label" for="authSearch" style="font-size: 10pt">権限で検索</label>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-7" v-if="search == '1'">
                    <input
                      type="text"
                      id="searchWord"
                      class="form-control border-secondary"
                      v-model="searchWord"
                      placeholder="ID/名前/住所のいずれかを入力してください"
                      required
                    />
                  </div>
                  <div class="col-lg-7" v-else>
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
                  <button class="btn-primary btn-sm" v-on:click="getUsers()">検索</button>
                </div>
              </div>
            </div>
            <!-- ★ 問題1 END ★ -->
          <!-- ユーザー一覧 -->
          <b-table striped responsive hover :items="items" :fields="fields">
            <!-- ボタンセル定義 -->
            <template #cell(controls)="data">
              <b-button-group>
                <b-button variant="outline-primary" v-on:click="onClickEditButton(data.item)"> 編集 </b-button>
              </b-button-group>
            </template>
          </b-table>
        </div>
      </div>
      <Footer />
    </div>

    <!-- スクロールトップボタン-->
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
      isLoading: false,
      // 各項目初期値
      search: UserConst.Search.anySearch,
      auth: UserConst.Auth.general,
      // 各ラジオボタン設定値
      anySearch: UserConst.Search.anySearch,
      authSearch: UserConst.Search.authSearch,
      general: UserConst.Auth.general,
      admin: UserConst.Auth.admin,
      /**
       * ★問題2 Start★
       * 一覧にユーザー名の列を追加する
       *
       * <DB取得項目>
       * ユーザーID：user_id
       * ユーザー名：user_name
       * パスワード：password
       * 性別：gender
       * 権限：auth
       */
      fields: [
        { key: "user_id", label: "ユーザーID" },
        { key: "user_name", label: "ユーザー名" },
        { key: "address", label: "住所" },
        { key: "controls", label: "" },
      ],
      /*★問題2 End★*/
      items: [],
      searchWord: "",
      auth: "1",
      search: "1",
    };
  },
  async mounted() {
    try {
      // サインイン確認
      if (UserUtil.isSignIn()) {
        // ユーザー情報を検索
        await this.getUsers();

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
     * ユーザー検索処理
     */
    getUsers: async function () {
      this.isLoading = true;

      this.msg = "";
      this.errMsg = "";

      try {
        const searchParams = {
          userId: this.searchWord,
          userName: this.searchWord,
          address: this.searchWord,
          auth: this.auth,
          search: this.search,
        };
        const response = await AjaxUtil.getUser(searchParams);
        this.items = JSON.parse(response.data.Items);
      } catch (e) {
        this.msg = "";
        this.errMsg = "ユーザー検索に失敗しました";
        console.log(e);
      }

      this.isLoading = false;
    },

    /**
     * 編集ボタン押下時
     *
     * @param data
     */
    onClickEditButton: function (data) {
      // 編集画面へ遷移する
      this.$router.push({ name: "userManager", query: { userId: data.user_id } });
    },

    initRadioButton: function () {
      this.searchWord = "";
      this.auth = "1";
    },
  },
};
</script>
