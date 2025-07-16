<template>
  <div>
    <NaviMenu />

    <div id="wrapper">
      <Menu />

      <div id="content-wrapper" class="bg-light">
        <div class="container-fluid">
          <!-- パンくずリスト -->
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link tag="a" :to="{ name: 'top' }">トップページ</router-link>
            </li>
            <li class="breadcrumb-item active">お知らせ管理</li>
          </ol>

          <p class="text-primary" v-show="msg">{{ msg }}</p>
          <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

          <!-- お知らせ一覧 -->
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <div class="d-flex justify-content-between">
                <div class="form-group m-0 font-weight-bold">お知らせ一覧</div>
                <button class="btn-primary btn-sm" v-on:click="getUsers()">新規登録</button>
              </div>
            </div>
            <div class="card-body">
              <b-table responsive hover :items="items" :fields="fields">
                <!-- ボタンセル定義 -->

                <template #cell(controls)="data">
                  <div class="d-flex justify-content-md-end">
                    <b-button-group>
                      <b-button variant="outline-primary" v-on:click="onClickEditButton(data.item)"> 編集 </b-button>
                    </b-button-group>
                    <span style="padding-left: 30px"></span>
                    <b-button-group>
                      <b-button
                        variant="outline-danger"
                        v-on:click="onClickEditButton(data.item)"
                        data-toggle="modal"
                        data-target="#deleteConfirmModal"
                      >
                        削除
                      </b-button>
                    </b-button-group>
                  </div>
                </template>
              </b-table>
            </div>
          </div>
        </div>
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
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";
import Loading from "../components/Loading.vue";
export default {
  name: "InformationManager",
  props: ["flashMsg", "flashErrMsg"],
  components: { NaviMenu, Menu, Footer, Loading },
  data() {
    return {
      msg: "",
      errMsg: "",
      isLoading: false,
      fields: [
        { key: "no", label: "番号" },
        { key: "date", label: "掲載日" },
        { key: "title", label: "タイトル" },
        { key: "controls", label: "" },
      ],
      items: [],
    };
  },
  async mounted() {
    try {
      if (UserUtil.isSignIn()) {
        // 画面更新
        await this.updateView();
      } else {
        this.$router.push({ name: "signIn", params: { flashMsg: "サインインしてください" } });
      }
    } catch (e) {
      this.$router.push({ name: "signIn", params: { flashMsg: "サインインしてください" } });
    }
  },

  methods: {
    /**
     * 画面更新
     */
    updateView: async function () {
      this.msg = "";
      this.errMsg = "";

      // お知らせ取得
      await this.getInformation();
    },

    /**
     * お知らせ検索
     */
    getInformation: async function () {
      this.isLoading = true;

      // 一覧を初期化
      this.items = [];
      try {
        // お知らせを取得し、一覧に設定する
        const response = await AjaxUtil.getInformation();
        this.items = JSON.parse(response.data.Items);
      } catch (e) {
        this.msg = "";
        this.errMsg = "検索処理に失敗しました。";
        console.log(e);
      }

      this.isLoading = false;
    },
  },
};
</script>
