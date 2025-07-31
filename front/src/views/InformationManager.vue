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
            <li class="breadcrumb-item active">お知らせ管理</li>
          </ol>

          <p class="text-primary" v-show="msg">{{ msg }}</p>
          <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

          <div class="card shadow">
            <div class="card-header py-3">
              <div class="m-0 font-weight-bold text-secondary">
                <div class="row justify-content-between">
                  <strong class="ml-3"> お知らせ一覧 </strong>
                  <button
                    type="button"
                    class="btn btn-primary mr-3"
                    variant="outline-primary"
                    data-toggle="modal"
                    data-target="#createModal"
                    v-on:click="resetModalParam()"
                  >
                    新規登録
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body mb-5">
              <b-table responsive hover :items="items" :fields="fields">
                <!-- ボタンセル定義 -->
                <template #cell(controls)="data">
                  <button-group class="d-flex justify-content-end">
                    <button
                      class="btn btn-outline-primary mr-4"
                      variant="outline-primary"
                      v-on:click="
                        ((clickedRow = {
                          no: data.item.no,
                          date: data.item.date,
                          title: data.item.title,
                          content: data.item.content,
                        }),
                        updateModalParam(),
                        resetModalErrMsg())
                      "
                      data-toggle="modal"
                      data-target="#updateModal"
                    >
                      編集
                    </button>
                    <button
                      class="btn btn-outline-danger"
                      variant="outline-primary"
                      v-on:click="
                        ((clickedRow = {
                          no: data.item.no,
                          date: data.item.date,
                          title: data.item.title,
                          content: data.item.content,
                        }),
                        deleteModalParam())
                      "
                      data-toggle="modal"
                      data-target="#deleteModal"
                    >
                      削除
                    </button>
                  </button-group>
                </template>
              </b-table>
            </div>
          </div>
          <br />
        </div>
        <Footer />
      </div>

      <!-- 新規登録Modal -->
      <div
        class="modal fade"
        id="createModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div
                class="modal-title m-0 font-weight-bold text-primary text-secondary"
                id="myModalLabel"
                v-show="clickedRow"
              >
                以下の内容でお知らせを登録してよろしいですか？
              </div>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p class="text-danger" v-show="modalErrMsg">{{ modalErrMsg }}</p>
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">タイトル</label>
                <div class="col-sm-9 d-flex align-items-center">
                  <textarea type="text" id="title" class="form-control" style="resize: none" v-model="title"></textarea>
                </div>
              </div>
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">詳細</label>
                <div class="col-sm-9 d-flex align-items-center">
                  <textarea
                    type="text"
                    id="contemt"
                    class="form-control"
                    style="resize: none"
                    v-model="content"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="form-group d-flex justify-content-center align-items-center mb-1">
                <div class="p-2 w-50">
                  <input type="button" class="btn btn-primary" v-on:click="addInformation()" value="登録" />
                </div>
                <input
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  style="width: 100px; height: 40px"
                  value="キャンセル"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /modal -->

      <!-- 編集モーダル -->
      <div
        class="modal fade"
        id="updateModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div
                class="modal-title m-0 font-weight-bold text-primary text-secondary"
                id="myModalLabel"
                v-show="clickedRow"
              >
                以下の内容でお知らせを更新してよろしいですか？
              </div>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p class="text-danger" v-show="modalErrMsg">{{ modalErrMsg }}</p>
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">番号</label>
                <div class="col-sm-9 d-flex align-items-center">
                  <div class="multiline-text" style="font-size: 12pt" v-show="clickedRow">{{ clickedRow.no }}</div>
                </div>
              </div>
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">掲載日</label>
                <div class="col-sm-9 d-flex align-items-center">
                  <div class="multiline-text" style="font-size: 12pt" v-show="clickedRow">{{ clickedRow.date }}</div>
                </div>
              </div>
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">タイトル</label>
                <div class="col-sm-9 d-flex align-items-center">
                  <textarea type="text" id="title" class="form-control" style="resize: none" v-model="title"></textarea>
                </div>
              </div>
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">詳細</label>
                <div class="col-sm-9 d-flex align-items-center">
                  <textarea
                    type="text"
                    id="contemt"
                    class="form-control"
                    style="resize: none"
                    v-model="content"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="form-group d-flex justify-content-center align-items-center mb-1">
                <div class="p-2 w-50">
                  <input type="button" class="btn btn-primary" v-on:click="updateInformation()" value="更新" />
                </div>
                <input
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  style="width: 100px; height: 40px"
                  value="キャンセル"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /modal -->

      <!-- 削除モーダル -->
      <div
        class="modal fade"
        id="deleteModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div
                class="modal-title m-0 font-weight-bold text-primary text-secondary"
                id="myModalLabel"
                v-show="clickedRow"
              >
                以下の内容でお知らせを削除してよろしいですか？
              </div>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">番号</label>
                <div class="col-sm-9 d-flex align-items-center">
                  <div class="multiline-text" style="font-size: 12pt" v-show="clickedRow">{{ clickedRow.no }}</div>
                </div>
              </div>
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">掲載日</label>
                <div class="col-sm-9 d-flex align-items-center">
                  <div class="multiline-text" style="font-size: 12pt" v-show="clickedRow">{{ clickedRow.date }}</div>
                </div>
              </div>
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">タイトル</label>
                <div class="col-sm-9 d-flex align-items-center">
                  <div class="multiline-text" style="font-size: 12pt" v-show="clickedRow">{{ clickedRow.title }}</div>
                </div>
              </div>
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">詳細</label>
                <div class="col-sm-9 d-flex align-items-center">
                  <div class="multiline-text" style="font-size: 12pt" v-show="clickedRow">{{ clickedRow.content }}</div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="form-group d-flex justify-content-center align-items-center mb-1">
                <div class="p-2 w-50">
                  <input
                    type="button"
                    class="btn btn-danger"
                    v-on:click="deleteInformation()"
                    data-dismiss="modal"
                    value="削除"
                  />
                </div>
                <input
                  type="button"
                  class="btn btn-secondary d-flex align-items-end"
                  data-dismiss="modal"
                  style="width: 100px; height: 40px"
                  value="キャンセル"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /modal -->
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
// 共通
import NaviMenu from "../components/NaviMenu.vue";
import "../utils/sb-admin";
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";
import Loading from "../components/Loading.vue";
import { data } from "jquery";

export default {
  name: "InformationManager",
  props: ["flashMsg"],
  components: { NaviMenu, Menu, Footer, Loading },
  data() {
    return {
      msg: this.flashMsg,
      errMsg: "",
      modalErrMsg: "",
      clickedRow: {},
      isLoading: false,
      // 各項目初期値
      no: "",
      date: "",
      title: "",
      content: "",

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
      this.modalErrMsg = "";
      this.title = "";
      this.content = "";

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
        this.errMsg = "お知らせ取得処理に失敗しました";
        console.log(e);
      }

      this.isLoading = false;
    },

    resetModalParam: function () {
      this.errMsg = "";
      this.modalErrMsg = "";
      this.title = "";
      this.content = "";
    },

    resetModalErrMsg: function () {
      this.errMsg = "";
      this.modalErrMsg = "";
    },

    /**
     * お知らせ新規登録
     */
    addInformation: async function () {
      this.isLoading = true;

      try {
        // 入力チェック
        if (this.title === null || this.title === "") {
          this.modalErrMsg = "タイトルを入力してください";
          return;
        }

        if (this.title.length > 100) {
          this.modalErrMsg = "タイトルは100桁以下で入力してください";
          return;
        }

        if (this.content === null || this.content === "") {
          this.modalErrMsg = "詳細を入力してください";
          return;
        }

        if (this.content.length > 100) {
          this.modalErrMsg = "詳細は100桁以下で入力してください";
          return;
        }

        // 引数格納
        const model = {
          title: this.title,
          content: this.content,
        };

        // 登録
        await AjaxUtil.postInformation(model);
        //モーダルの非表示
        $("#createModal").modal("hide");

        await this.updateView();

        this.msg = "登録に成功しました";
      } catch (e) {
        $("#createModal").modal("hide");
        this.msg = "";
        this.errMsg = "登録に失敗しました";
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * お知らせ更新
     */
    updateModalParam: function () {
      this.no = this.clickedRow.no;
      this.title = this.clickedRow.title;
      this.content = this.clickedRow.content;
    },

    updateInformation: async function () {
      // メッセージ初期化
      this.msg = "";
      this.errMsg = "";
      this.modalErrMsg = "";

      this.isLoading = true;

      try {
        // 入力チェック
        if (this.title === null || this.title === "") {
          this.modalErrMsg = "タイトルを入力してください";
          return;
        }
        if (this.title.length > 100) {
          this.modalErrMsg = "タイトルは100桁以下で入力してください";
          return;
        }
        if (this.content === null || this.content === "") {
          this.modalErrMsg = "詳細を入力してください";
          return;
        }
        if (this.content.length > 100) {
          this.modalErrMsg = "詳細は100桁以下で入力してください";
          return;
        }

        // 引数格納
        const model = {
          no: this.no,
          title: this.title,
          content: this.content,
        };

        await AjaxUtil.putInformation(model);
        //モーダルの非表示
        $("#updateModal").modal("hide");

        await this.updateView();

        this.msg = "更新に成功しました";
      } catch (e) {
        $("#updateModal").modal("hide");
        this.msg = "";
        this.errMsg = "更新に失敗しました";
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * お知らせ削除
     */
    deleteModalParam: function () {
      this.no = this.clickedRow.no;
    },

    deleteInformation: async function () {
      // メッセージ初期化
      this.msg = "";
      this.errMsg = "";
      this.modalErrMsg = "";

      this.isLoading = true;

      try {
        // 削除
        await AjaxUtil.deleteInformation(this.no);
        await this.updateView();

        this.msg = "削除に成功しました";
      } catch (e) {
        this.msg = "";
        this.errMsg = "削除に失敗しました";
        console.log(e);
      }

      this.isLoading = false;
    },
  },
};
</script>
