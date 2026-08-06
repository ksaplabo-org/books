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

          <div class="card">
            <div class="card-header small">
              <!--
                ★課題01-01 Start★
                  検索欄上部の文言を設計書通りに変更する。
    
                  divタグ：特に単体では意味をなさない。
                          タグで囲んだ部分をグループ化することができる。
              -->
              <div class="px-2 mt-2"></div>
              <!-- ★課題01-01 END★ -->
              <div class="custom-control custom-radio custom-control-inline m-2">
                <input
                type="radio"
                id="searchModeLike"
                name="searchModeRadio"
                class="custom-control-input"
                value="modeLike"
                v-model="searchMode"
                checked
                />
                <label class="custom-control-label" for="searchModeLike">ID/名前/住所で検索</label>
              </div>
              <!-- 
                ★追加課題01-01 Start★
                  以下の要素のコメントアウトを削除して、権限で検索のタブが表示されることを確認する。
              -->
              <!-- <div class="custom-control custom-radio custom-control-inline m-2">
                <input
                type="radio"
                id="searchModeAuth"
                name="searchModeRadio"
                class="custom-control-input"
                value="modeAuth"
                v-model="searchMode"
                />
                <label class="custom-control-label" for="searchModeAuth">権限で検索</label>
              </div> -->
              <!-- ★追加課題01-01 END★ -->
            </div>

            <div class="form-group m-2">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-6">
                    <div v-if="searchMode === 'modeLike'">
                      <input
                      type="text"
                      id="searchWord"
                      class="form-control border-secondary"
                      v-model="searchWord"
                      placeholder="ID/名前/住所のいずれかを入力してください"
                      required
                      />
                    </div>
                    <!-- 
                      ★追加課題01-02 Start★
                        v-ifの判定条件を修正して設計書通りのレイアウトを実装する。
                        inputタグに設定しているv-model、v-bindの値を修正して、選択した検索方法の情報を保持させる。
                        ※それぞれ[test]と書かれた箇所を修正すること。
                    -->
                    <div v-if="searchMode === 'test'">
                      <div class="form-control border-white">
                        <div class="custom-control custom-radio custom-control-inline">
                          <input
                          type="radio"
                          id="generalRadio"
                          name="authRadio"
                          class="custom-control-input"
                          v-model="test"
                          v-bind:value="test"
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
                          v-model="test"
                          v-bind:value="test"
                          />
                          <label class="custom-control-label" for="adminRadio">社員</label>
                        </div>
                      </div>
                    </div>
                    <!-- ★追加課題01-02 END★ -->
                  </div>
                  <!--
                    ★課題01-02 Start★
                      検索ボタンをクリックした際に検索処理を呼び出すようにする。
        
                      function() {}：何もしてない処理。
                  -->
                  <button class="btn-primary btn-sm" v-on:click="function() {}">検索</button>
                  <!-- ★課題01-02 END★ -->
                </div>
              </div>
            </div>
          </div>
          
          <br />
          
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
      /**
       * ★課題01-03 Start★
       * 一覧に[ユーザー名]、[住所]の列を追加する。
       * ※DBから取得できる項目については、基本設計書の[概要]シート.[5. データベース仕様]を参照。
       */
      fields: [
        { key: "user_id", label: "ユーザーID" },
        { key: "controls", label: "" },
      ],
      /* ★課題01-03 End★ */
      items: [],
      searchMode: "modeLike",
      searchWord: "",
      auth: UserConst.Auth.general,
      general: UserConst.Auth.general,
      admin: UserConst.Auth.admin,
    };
  },
  /**
   * ユーザー一覧画面初期処理
   */
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
      this.msg = "";
      this.errMsg = "";
      this.isLoading = true;

      try {
        let response;
        if (this.searchMode === "modeLike") {
          // ユーザーID/ユーザー名/住所のあいまい検索
          const searchParams = {
            userId: this.searchWord,
            userName: this.searchWord,
            address: this.searchWord,
          };
          response = await AjaxUtil.getUser(searchParams);
        } else {
          /**
           * ★追加課題01-03 Start★
           * 権限を選択した場合に権限検索処理を呼び出す。
           * ※呼び出す関数は、詳細設計書の[ユーザー検索処理]シートを参照。
           */
          // 権限の検索
          
          /* ★追加課題01-03 End★ */
        }
        this.items = JSON.parse(response.data.Items);
      } catch (e) {
        this.msg = "";
        this.errMsg = "ユーザー検索に失敗しました";
        console.log(e);
      }

      this.isLoading = false;
    },

    /**
     * ユーザー管理画面呼び出し
     *
     * @param data
     */
    onClickEditButton: function (data) {
      // 編集画面へ遷移する
      this.$router.push({ name: "userManager", query: { userId: data.user_id } });
    },
  },
};
</script>
