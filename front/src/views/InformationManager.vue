<template>
  <div class="informationManager">
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

          <!-- お知らせ欄 -->
          <div class="card shadow mb-4">
            <div class="card-header d-flex align-items-center justify-content-between">
              <!-- お知らせ一覧タイトル -->
              <div class="font-weight-bold">お知らせ一覧</div>
              <!-- 新規登録ボタン -->
              <button
                type="button"
                class="btn btn-primary"
                @click="((reg = regType.create), beforeCreateModal({}))"
                data-toggle="modal"
                data-target="#modal"
              >
                新規登録
              </button>
            </div>
            <!-- お知らせ一覧テーブル -->
            <form @submit.stop.prevent="editInformation">
              <div class="card-body">
                <b-table striped responsive hover :items="items" :fields="fields">
                  <!-- ボタンセル定義 -->
                  <template #cell(controls)="data">
                    <!-- 編集ボタン -->
                    <b-button
                      variant="outline-primary"
                      @click="((reg = regType.update), beforeCreateModal(data.item))"
                      data-toggle="modal"
                      data-target="#modal"
                    >
                      編集
                    </b-button>
                    <!-- 削除ボタン -->
                    <b-button
                      variant="outline-danger"
                      @click="((reg = regType.delete), beforeCreateModal(data.item))"
                      data-toggle="modal"
                      data-target="#modal"
                    >
                      削除
                    </b-button>
                  </template>
                </b-table>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>

      <!-- モーダル -->
      <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title m-0 font-weight-bold text-primary text-secondary">
                <label v-if="reg === regType.create">以下の内容でお知らせを登録してよろしいですか？</label>
                <label v-if="reg === regType.update">以下の内容でお知らせを更新してよろしいですか？</label>
                <label v-if="reg === regType.delete">以下のお知らせを削除してよろしいですか？</label>
              </div>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p class="text-danger" v-show="errMsgModal">{{ errMsgModal }}</p>
              <div v-if="reg !== regType.create">
                <div class="row pb-3">
                  <div class="col-3 col-form-label">ID</div>
                  <div id="id" class="col-9 col-form-label">{{ no }}</div>
                </div>
                <div class="row pb-3">
                  <div class="col-3 col-form-label">掲載日</div>
                  <div id="date" class="col-9 col-form-label">{{ date }}</div>
                </div>
              </div>
              <div class="row pb-3">
                <div class="col-3 col-form-label">タイトル</div>
                <div class="col-9">
                  <textarea
                    id="title"
                    v-model="title"
                    autocomplete="off"
                    style="resize: none"
                    v-bind="
                      reg === regType.delete
                        ? { class: 'form-control-plaintext', disabled: true } // 削除の場合は編集無効
                        : { class: 'form-control' } // 新規登録、編集の場合は編集有効
                    "
                  ></textarea>
                </div>
              </div>
              <div class="row pb-3">
                <div class="col-3 col-form-label">詳細</div>
                <div class="col-9">
                  <textarea
                    id="content"
                    v-model="content"
                    autocomplete="off"
                    style="resize: none"
                    v-bind="
                      reg === regType.delete
                        ? { class: 'form-control-plaintext', disabled: true } // 削除の場合は編集無効
                        : { class: 'form-control' } // 新規登録、編集の場合は編集有効
                    "
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                v-if="reg === regType.create"
                id="addButton"
                type="button"
                class="btn btn-primary"
                @click="addInformation()"
              >
                登録
              </button>
              <button
                v-if="reg === regType.update"
                id="updateButton"
                type="button"
                class="btn btn-primary"
                @click="updateInformation()"
              >
                更新
              </button>
              <button
                v-if="reg === regType.delete"
                id="deleteButton"
                type="button"
                class="btn btn-danger"
                @click="deleteInformation()"
              >
                削除
              </button>

              <button id="cancelButton" type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
            </div>
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
import "../utils/sb-admin";
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
      errMsgModal: "",
      isLoading: false,
      fields: [
        { key: "no", label: "ID" },
        { key: "date", label: "掲載日" },
        { key: "title", label: "タイトル" },
        { key: "controls", label: "" },
      ],
      items: [],

      // 登録種別
      reg: 0,
      regType: {
        create: 1, // 作成
        update: 2, // 更新
        delete: 3, // 削除
      },

      // 各項目初期値
      no: "",
      date: "",
      title: "",
      content: "",
    };
  },
  async mounted() {
    try {
      // サインインチェック
      if (UserUtil.isSignIn() && UserUtil.isAdmin()) {
        // メッセージ初期化
        this.msg = "";
        this.errMsg = "";

        // お知らせを検索
        this.isLoading = true;
        await this.getInformation();
        this.isLoading = false;
      } else {
        // サインイン画面に遷移
        this.$router.push({ name: "signIn", params: { flashMsg: "サインインしてください" } });
      }
    } catch (e) {
      this.errMsg = e.message;
    }
  },
  methods: {
    /**
     * お知らせ検索
     */
    getInformation: async function () {
      // 一覧の初期化
      this.items = [];

      try {
        // 検索処理
        const response = await AjaxUtil.getInformation();
        this.items = JSON.parse(response.data.Items);
      } catch (e) {
        this.errMsg = "検索処理に失敗しました";
      }
    },

    /**
     * モーダル作成前処理
     *
     * @param information お知らせ情報
     */
    beforeCreateModal: function (information) {
      // モーダルメッセージの初期化
      this.errMsgModal = "";

      // モーダルの各項目に値を設定
      this.no = information.no;
      this.date = information.date;
      this.title = information.title;
      this.content = information.content;
    },

    /**
     * お知らせ入力値をチェック
     */
    checkInformation: function () {
      if (!this.title) {
        this.errMsgModal = "タイトルを入力してください";
        return false;
      }

      if (this.title.length > 100) {
        this.errMsgModal = "タイトルは100桁以下で入力してください";
        return false;
      }

      if (!this.content) {
        this.errMsgModal = "詳細を入力してください";
        return false;
      }

      if (this.content.length > 100) {
        this.errMsgModal = "詳細は100桁以下で入力してください";
        return false;
      }
      return true;
    },

    /**
     * お知らせ追加
     */
    addInformation: async function () {
      // メッセージの初期化
      this.msg = "";
      this.errMsg = "";

      // 入力チェック
      if (!this.checkInformation()) {
        return;
      }

      this.isLoading = true;

      // モーダルを閉じる
      $("#modal").modal("hide");

      try {
        // 新規登録処理
        await AjaxUtil.postInformation({ title: this.title, content: this.content });

        // 一覧を再検索
        await this.getInformation();

        this.msg = "登録に成功しました";
      } catch (e) {
        this.errMsg = "登録に失敗しました";
        console.log(e);
      }

      this.isLoading = false;
    },

    /**
     * お知らせ更新
     */
    updateInformation: async function () {
      // メッセージの初期化
      this.msg = "";
      this.errMsg = "";

      // 入力チェック
      if (!this.checkInformation()) {
        this.isLoading = false;
        return;
      }

      this.isLoading = true;

      // モーダルを閉じる
      $("#modal").modal("hide");

      try {
        // 更新処理
        await AjaxUtil.putInformation({
          no: this.no,
          title: this.title,
          content: this.content,
        });

        // 一覧を再検索
        await this.getInformation();

        this.msg = "更新に成功しました";
      } catch (e) {
        this.errMsg = "更新に失敗しました";
        console.log(e);
      }

      this.isLoading = false;
    },

    /**
     * お知らせ削除
     */
    deleteInformation: async function () {
      // メッセージの初期化
      this.msg = "";
      this.errMsg = "";

      this.isLoading = true;

      // モーダルを閉じる
      $("#modal").modal("hide");

      try {
        // 削除処理
        await AjaxUtil.deleteInformation(this.no);

        // 一覧を再検索
        await this.getInformation();

        this.msg = "削除に成功しました";
      } catch (e) {
        this.errMsg = "削除に失敗しました";
        console.log(e);
      }

      this.isLoading = false;
    },
  },
};
</script>
