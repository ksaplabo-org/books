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
            <li class="breadcrumb-item active">お知らせ管理</li>
          </ol>

          <p class="text-primary" v-show="msg">{{ msg }}</p>
          <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

          <div class="form-group">
            <p style="float: left; font-weight: bold">お知らせ一覧</p>
            <input style="float: right" class="btn btn-primary" type="submit" value="新規登録" />
          </div>

          <br />

          <!-- お知らせー一覧 -->
          <b-table striped responsive hover :items="items" :fields="fields">
            <!-- ボタンセル定義 -->
            <template #cell(controls)="data">
              <b-button-group>
                <b-button
                  variant="outline-primary"
                  data-toggle="modal"
                  data-target="#editModal"
                  v-on:click="
                    clickedRow = {
                      no: data.item.no,
                      date: data.item.date,
                      title: data.item.title,
                      text: data.item.content,
                    }
                  "
                  >編集</b-button
                >
              </b-button-group>

              <b-button-group>
                <b-button variant="outline-primary" v-on:click="onClickEditButton(data.item)"> 削除</b-button>
              </b-button-group>
            </template>
          </b-table>
        </div>
      </div>
      <!-- 編集用モーダル -->
      <div
        class="modal fade"
        id="editModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <p class="modal-title" id="myModalLabel">以下の内容でお知らせを更新してよろしいですか？</p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" v-show="clickedRow">
              <tr>
                <td>番号</td>
                <td>{{ clickedRow.no }}</td>
              </tr>
              <tr>
                <td>掲載日</td>
                <td>{{ clickedRow.date }}</td>
              </tr>
              <tr>
                <td>タイトル</td>
                <td>
                  <input type="text" class="form-control" v-model="clickedRow.title" />
                </td>
              </tr>
              <tr>
                <td>詳細</td>
                <td>
                  <input type="text" class="form-control" v-model="clickedRow.text" />
                </td>
              </tr>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="">更新</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
            </div>
          </div>
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
// 共通
import NaviMenu from "../components/NaviMenu.vue";
import "../utils/sb-admin";
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";
import Loading from "../components/Loading.vue";
export default {
  props: ["flashMsg"],
  components: { NaviMenu, Menu, Footer, Loading },
  data() {
    return {
      msg: this.flashMsg,
      errMsg: "",
      clickedRow: {},
      isLoading: false,
      fields: [
        { key: "no", label: "番号" },
        { key: "date", label: "掲載日" },
        { key: "title", label: "お知らせ" },
        { key: "controls", label: "" },
      ],
      no: "",
      title: "",
      content: "",
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

    updateInformation: async function () {
      this.msg = "";
      this.errMsg = "";

      if (this.userId == null || this.userId === "") {
        this.errMsg = "ユーザーIDを入力してください";
        return;
      }
    },
  },
};
</script>
