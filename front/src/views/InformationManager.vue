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
                <!-- 新規登録ボタン -->
                <b-button-group>
                  <b-button
                    type="button"
                    variant="btn btn-primary"
                    data-toggle="modal"
                    data-target="#insertConfirmModal"
                  >
                    新規登録
                  </b-button>
                </b-button-group>
              </div>
            </div>
            <div class="card-body">
              <b-table responsive hover :items="items" :fields="fields">
                <!-- ボタンセル定義 -->
                <template #cell(controls)="data">
                  <div class="d-flex justify-content-md-end">
                    <b-button-group>
                      <b-button
                        variant="outline-primary"
                        v-on:click="
                          clickedRow = {
                            no: data.item.no,
                            date: data.item.date,
                            title: data.item.title,
                            content: data.item.content,
                          }
                        "
                        data-toggle="modal"
                        data-target="#updateConfirmModal"
                      >
                        編集
                      </b-button>
                    </b-button-group>
                    <span style="padding-left: 30px"></span>
                    <b-button-group>
                      <b-button
                        variant="outline-danger"
                        v-on:click="
                          clickedRow = {
                            no: data.item.no,
                            date: data.item.date,
                            title: data.item.title,
                            content: data.item.content,
                          }
                        "
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

    <!-- 新規登録モーダル -->
    <div
      class="modal fade"
      id="insertConfirmModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <form @submit.stop.prevent="addInformation" method="post">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="myModalLabel">
                以下の内容でお知らせを登録してよろしいですか？
              </div>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" style="padding-bottom: 0">
              <p class="text-danger" v-show="inputErrorMsg">{{ inputErrorMsg }}</p>
              <table cellpadding="5">
                <tr>
                  <td width="120" style="vertical-align: top">
                    <div>タイトル</div>
                  </td>
                  <td>
                    <div class="form-group">
                      <textarea rows="2" cols="100" id="title" class="form-control" v-model="title"></textarea>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="vertical-align: top">
                    <div>詳細</div>
                  </td>
                  <td>
                    <div class="form-group">
                      <textarea rows="2" cols="100" id="content" class="form-control" v-model="content"></textarea>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" v-on:click="addInformation()">登録</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- 更新モーダル -->
    <div
      class="modal fade"
      id="updateConfirmModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="myModalLabel">
              以下の内容でお知らせを更新してよろしいですか？
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style="padding-bottom: 0;">
            <p class="text-danger" v-show="updateErrorMsg">{{ updateErrorMsg }}</p>
            <table cellpadding="5">
              <tr>
                <td width="120">
                  <div>番号</div>
                </td>
                <td>
                  <div v-show="clickedRow">{{ clickedRow.no }}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>掲載日</div>
                </td>
                <td>
                  <div v-show="clickedRow">{{ clickedRow.date }}</div>
                </td>
              </tr>
              <tr>
                <td style="vertical-align: top">
                  <div>タイトル</div>
                </td>
                <td>
                  <div class="form-group">
                    <textarea rows="2" cols="100" id="title" class="form-control" v-model="clickedRow.title"></textarea>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="vertical-align: top">
                  <div>詳細</div>
                </td>
                <td>
                  <div class="form-group">
                    <textarea
                      rows="2"
                      cols="100"
                      id="content"
                      class="form-control"
                      v-model="clickedRow.content"
                    ></textarea>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="updateInformation()">更新</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
          </div>
        </div>
      </div>
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
            <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="myModalLabel">
              以下のお知らせを削除してよろしいですか？
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <table cellpadding="5">
              <tr>
                <td width="120">
                  <div>番号</div>
                </td>
                <td>
                  <div v-show="clickedRow">{{ clickedRow.no }}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>掲載日</div>
                </td>
                <td>
                  <div v-show="clickedRow">{{ clickedRow.date }}</div>
                </td>
              </tr>
              <tr>
                <td style="vertical-align: top">
                  <div>タイトル</div>
                </td>
                <td>
                  <div v-show="clickedRow">{{ clickedRow.title }}</div>
                </td>
              </tr>
              <tr>
                <td style="vertical-align: top">
                  <div>詳細</div>
                </td>
                <td>
                  <div v-show="clickedRow">{{ clickedRow.content }}</div>
                </td>
              </tr>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="deleteInformation()">
              削除
            </button>
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
import { data } from "jquery";

export default {
  name: "InformationManager",
  props: ["flashMsg", "flashErrMsg"],
  components: { NaviMenu, Menu, Footer, Loading },
  data() {
    return {
      msg: "",
      errMsg: "",
      clickedRow: {},
      isLoading: false,
      fields: [
        { key: "no", label: "番号" },
        { key: "date", label: "掲載日" },
        { key: "title", label: "タイトル" },
        { key: "controls", label: "" },
      ],
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
        // メッセージ設定
        this.msg = this.flashMsg;
        this.errMsg = this.flashErrMsg;
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
      this.inputErrorMsg = "";
      this.updateErrorMsg = "";
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

      this.msg = "";
      this.errMsg = "";

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
    /**
     * お知らせ新規登録
     */
    addInformation: async function () {
      this.isLoading = true;
      try {
        // 入力チェック
        /**
         * タイトル必須入力チェックを行う。
         * エラーがある場合は以下のエラーメッセージを表示する。
         * エラーメッセージ：「タイトルを入力してください」
         */
        if (this.title == null || this.title === "") {
          this.inputErrorMsg = "タイトルを入力してください";
          return;
        }
        /**
         * タイトル桁数チェックを行う。
         * 桁数：1～100文字
         * エラーがある場合は以下のエラーメッセージを表示する。
         * エラーメッセージ：「タイトルは100桁以下で入力してください」
         */
        if (this.title.length < 1 || this.title.length > 100) {
          this.inputErrorMsg = "タイトルは100桁以下で入力してください";
          return;
        }
        /**
         * 詳細必須入力チェックを行う。
         * エラーがある場合は以下のエラーメッセージを表示する。
         * エラーメッセージ：「詳細を入力してください」
         */
        if (this.content == null || this.content === "") {
          this.inputErrorMsg = "詳細を入力してください";
          return;
        }
        /**
         * 詳細桁数チェックを行う。
         * 桁数：1～100文字
         * エラーがある場合は以下のエラーメッセージを表示する。
         * エラーメッセージ：「詳細は100桁以下で入力してください」
         */
        if (this.content.length < 1 || this.content.length > 100) {
          this.inputErrorMsg = "詳細は100桁以下で入力してください";
          return;
        }
        // 引数格納
        const model = {
          title: this.title,
          content: this.content,
        };
        // 登録
        await AjaxUtil.postInformation(model);
        $("#insertConfirmModal").modal("hide");
        await this.updateView();
        // お知らせ管理に遷移する
        this.msg = "登録に成功しました";
      } catch (e) {
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
    updateInformation: async function () {
      this.isLoading = true;
      try {
        // 入力チェック
        /**
         * タイトル必須入力チェックを行う。
         * エラーがある場合は以下のエラーメッセージを表示する。
         * エラーメッセージ：「タイトルを入力してください」
         */
        if (this.clickedRow.title == null || this.clickedRow.title === "") {
          this.updateErrorMsg = "タイトルを入力してください";
          return;
        }
        /**
         * タイトル桁数チェックを行う。
         * 桁数：1～100文字
         * エラーがある場合は以下のエラーメッセージを表示する。
         * エラーメッセージ：「タイトルは100桁以下で入力してください」
         */
        if (this.clickedRow.title.length < 1 || this.clickedRow.title.length > 100) {
          this.updateErrorMsg = "タイトルは100桁以下で入力してください";
          return;
        }
        /**
         * 詳細必須入力チェックを行う。
         * エラーがある場合は以下のエラーメッセージを表示する。
         * エラーメッセージ：「詳細を入力してください」
         */
        if (this.clickedRow.content == null || this.clickedRow.content === "") {
          this.updateErrorMsg = "詳細を入力してください";
          return;
        }
        /**
         * 詳細桁数チェックを行う。
         * 桁数：1～100文字
         * エラーがある場合は以下のエラーメッセージを表示する。
         * エラーメッセージ：「詳細は100桁以下で入力してください」
         */
        if (this.clickedRow.content.length < 1 || this.clickedRow.content.length > 100) {
          this.updateErrorMsg = "詳細は100桁以下で入力してください";
          return;
        }
        // 引数格納
        const model = {
          no: this.clickedRow.no,
          title: this.clickedRow.title,
          content: this.clickedRow.content,
        };
        // 更新
        await AjaxUtil.putInformation(model);
        // お知らせ管理に遷移する
        $("#updateConfirmModal").modal("hide");
        await this.updateView();
        this.msg = "更新に成功しました";
      } catch (e) {
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
    deleteInformation: async function () {
      // メッセージ初期化
      this.msg = "";
      this.errMsg = "";
      this.isLoading = true;
      try {
        // 削除
        await AjaxUtil.deleteInformation(this.clickedRow.no);
        await this.getInformation();
        // お知らせ管理に遷移する
        this.msg = "お知らせ情報の削除に成功しました";
      } catch (e) {
        this.msg = "";
        this.errMsg = "お知らせ情報の削除に失敗しました";
        console.log(e);
      }
      this.isLoading = false;
    },
  },
};
</script>
