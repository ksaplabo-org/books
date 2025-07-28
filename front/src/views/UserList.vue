<template>
  <div>
    <NaviMenu />

    <div id="wrapper">
      <Menu />

      <div id="content-wrapper" class="bg-light">
        <div class="container-fluid">
          <!-- パンくずリストStart-->
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link tag="a" :to="{ name: 'top' }">トップページ</router-link>
            </li>
            <li class="breadcrumb-item active">ユーザー一覧</li>
          </ol>
          <!-- パンくずリストEnd-->

          <!--メッセージ表示Start-->
          <p class="text-primary" v-show="msg">{{ msg }}</p>
          <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>
          <!--メッセージ表示End-->

          <!--検索機能Start-->
          <div class="card mb-1">
            <!--検索方法選択Start-->
            <div class="card-header py-3">
              <div class="px-1">検索方法を選択</div>

              <div class="form-check form-check-inline">
                <input
                  id="searchMethodRadio1"
                  class="form-check-input"
                  type="radio"
                  v-model="searchMethodCheck"
                  value="1"
                />
                <label class="form-check-label" for="searchMethodRadio1">ID/名前/住所で検索</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  id="searchMethodRadio2"
                  class="form-check-input"
                  type="radio"
                  v-model="searchMethodCheck"
                  value="2"
                />
                <label class="form-check-label" for="searchMethodRadio2">権限で検索</label>
              </div>
            </div>
            <!--検索方法選択End-->

            <!--検索表示切替Start-->
            <div class="card-body">
              <div class="form-group m-2">
                <!-- ID/名前/住所で検索 -->
                <div v-if="searchMethodCheck === '1'" class="row">
                  <div class="col-lg-6">
                    <input
                      type="text"
                      id="searchWord"
                      class="form-control border-secondary"
                      v-model="searchWord"
                      placeholder="ID/名前/住所のいずれかを入力してください"
                      required
                    />
                  </div>
                  <button class="btn-primary btn-sm" v-on:click="getUsers()">検索</button>
                </div>

                <!-- 権限で検索 -->
                <div v-else-if="searchMethodCheck === '2'" class="row">
                  <div class="col-lg-6">
                    <div class="form-check form-check-inline">
                      <input
                        id="authRadio1"
                        class="form-check-input"
                        type="radio"
                        v-model="auth"
                        value="1"
                        checked
                      />
                      <label class="form-check-label" for="authRadio1">一般</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input id="authRadio2" class="form-check-input" type="radio" v-model="auth" value="2" />
                      <label class="form-check-label" for="authRadio2">社員</label>
                    </div>
                  </div>
                  <button class="btn-primary btn-sm" v-on:click="getUsers()">検索</button>
                </div>
              </div>
            </div>
            <!--検索表示切替End-->
          </div>
          <!--検索機能End-->

          <br />

          <!-- ユーザー一覧Start -->
          <b-table striped responsive hover :items="items" :fields="fields">
            <!-- ボタンセル定義 -->
            <template #cell(controls)="data">
              <b-button-group>
                <b-button variant="outline-primary" v-on:click="onClickEditButton(data.item)"> 編集 </b-button>
              </b-button-group>
            </template>
          </b-table>
        </div>
        <!-- ユーザー一覧End -->
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

      fields: [
        { key: "user_id", label: "ユーザーID" },
        { key: "user_name", label: "ユーザー名" },
        { key: "address", label: "住所" },
        { key: "controls", label: "" },
      ],

      items: [],
      searchWord: "",
      searchMethodCheck: "1",
      auth: "1",
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
          searchMethodCheck: this.searchMethodCheck,
          auth: this.auth,
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
  },
};
</script>
