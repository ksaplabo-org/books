<template>
  <div class="listuser">
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

          <div class="continer" style="font-size: 10pt">
            <div class="card">
              <div class="card-header">
                <div class="px-2 mt-2">検索方法を選択</div>
                <div class="custom-control custom-radio custom-control-inline m-2">
                  <input
                    type="radio"
                    id="searchModeIdName"
                    name="searchModeRadio"
                    class="custom-control-input"
                    value="modeUser"
                    v-model="searchMode"
                    checked
                  />
                  <label class="custom-control-label" for="searchModeIdName">ID/名前/住所で検索</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline m-2">
                  <input
                    type="radio"
                    id="searchModeAuth"
                    name="searchModeRadio"
                    class="custom-control-input"
                    value="modeAuth"
                    v-model="searchMode"
                  />
                  <label class="custom-control-label" for="searchModeAuth">権限で検索</label>
                </div>
              </div>

              <div class="form-group m-2">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-6">
                      <div v-if="searchMode === 'modeUser'">
                        <input
                          type="text"
                          id="searchWord"
                          class="form-control border-secondary"
                          v-model="searchWord"
                          placeholder="ID/名前/住所のいずれかを入力してください"
                          required
                        />
                      </div>

                      <div v-if="searchMode === 'modeAuth'">
                        <div class="form-control border-white">
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
                      </div>
                    </div>
                    <button class="btn-primary btn-sm" v-on:click="getUsers()">検索</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />

          <!-- ユーザー一覧 -->
          <form @submit.stop.prevent="updateView">
            <b-table striped responsive hover :items="items" :fields="fields">
              <!-- ボタンセル定義 -->
              <template #cell(controls)="data">
                <b-button-group>
                  <b-button variant="outline-primary" v-on:click="onClickEditButton(data.item)"> 編集 </b-button>
                </b-button-group>
              </template>
            </b-table>
          </form>
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
  name: "ListUser",
  props: ["flashMsg", "flashErrMsg"],
  components: { NaviMenu, Menu, Footer, Loading },
  data() {
    return {
      msg: "",
      errMsg: "",
      isLoading: false,
      fields: [
        { key: "user_id", label: "ユーザーID" },
        { key: "user_name", label: "ユーザー名" },
        { key: "address", label: "住所" },
        { key: "controls", label: "" },
      ],
      items: [],
      searchMode: "modeUser",
      searchWord: "",
      auth: UserConst.Auth.general,
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
      // ユーザー情報検索処理
      await this.getUsers();
    },

    /**
     * ユーザー検索処理
     */
    getUsers: async function () {
      this.isLoading = true;

      this.msg = "";
      this.errMsg = "";

      try {
        let response;
        if (this.searchMode === "modeUser") {
          // ユーザーID/ユーザー名/住所のあいまい検索
          response = await AjaxUtil.getUser(this.searchWord, this.searchWord, this.searchWord);
        } else {
          // 権限の検索
          response = await AjaxUtil.getUserByAuth(this.auth);
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
     * 編集ボタン押下時
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
