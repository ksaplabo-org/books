<template>
  <div>
    <NaviMenu />

    <div id="wrapper">
      <Menu />

      <div id="content-wrapper" class="bg-light">
        <div class="container-fluid">
          <!-- パンくずリストStart -->
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link tag="a" :to="{ name: 'top' }">トップページ</router-link>
            </li>
            <li class="breadcrumb-item active">お知らせ管理</li>
          </ol>
          <!-- パンくずリストEnd-->

          <!-- お知らせ一覧部分ヘッダーStart-->
          <p class="text-primary" v-show="msg">{{ msg }}</p>
          <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>
          <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex justify-content-between align-items-center">
              <h5 class="card-title font-weight-bold mb-0">お知らせ一覧</h5>
              <button
                class="btn btn-primary ml-5"
                type="submit"
                data-toggle="modal"
                data-target="#addModal"
                v-on:click="openModal()"
              >
                新規登録
              </button>
            </div>
            <!-- お知らせ一覧部分ヘッダーEnd -->

            <!-- お知らせー一覧Start -->
            <div class="card p-4">
              <b-table responsive hover :items="items" :fields="fields">
                <!-- ボタンセル定義 -->
                <template #cell(controls)="data">
                  <!-- 編集ボタン -->
                  <div class="d-flex btn-group justify-content-md-end">
                    <div class="mr-4">
                      <b-button
                        variant="btn btn-outline-primary"
                        data-toggle="modal"
                        data-target="#updateModal"
                        v-on:click="
                          ((clickedRow = {
                            no: data.item.no,
                            date: data.item.date,
                            title: data.item.title,
                            text: data.item.content,
                          }),
                          openModal())
                        "
                        >編集</b-button
                      >
                    </div>
                    <!-- 削除ボタン -->
                    <div>
                      <b-button
                        variant="btn btn-outline-danger"
                        data-toggle="modal"
                        data-target="#deleteModal"
                        v-on:click="
                          ((clickedRow = {
                            no: data.item.no,
                            date: data.item.date,
                            title: data.item.title,
                            text: data.item.content,
                          }),
                          openModal())
                        "
                        >削除</b-button
                      >
                    </div>
                  </div>
                </template>
              </b-table>
            </div>
          </div>
        </div>
      </div>
      <!-- お知らせー一覧End -->

      <!-- 登録用モーダルStart -->
      <div
        class="modal fade"
        id="addModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <p class="modal-title font-weight-bold text-secondary" id="myModalLabel">
                以下の内容でお知らせを登録してよろしいですか？
              </p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form @submit.stop.prevent="addInformation" method="post">
              <div class="modal-body" v-show="clickedRow">
                <p class="text-danger" v-show="modalErrMsg">{{ modalErrMsg }}</p>

                <div class="form-group row align-item-center">
                  <label class="col-sm-3 col-form-label">タイトル</label>
                  <div class="col-sm-9">
                    <textarea row="2" class="form-control" rows="2" v-model="title"></textarea>
                  </div>
                </div>

                <div class="form-group row align-item-center">
                  <label class="col-sm-3 col-form-label">詳細</label>
                  <div class="col-sm-9">
                    <textarea row="2" class="form-control" v-model="content"></textarea>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <input type="submit" class="btn btn-primary" value="登録" />

                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="modalClose()">
                  キャンセル
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- 登録用モーダルEnd -->

      <!-- 編集用モーダルStart -->
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
              <p class="modal-title font-weight-bold text-secondary" id="myModalLabel">
                以下の内容でお知らせを更新してよろしいですか？
              </p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form @submit.stop.prevent="updateInformation" method="post">
              <div class="modal-body" v-show="clickedRow">
                <p class="text-danger" v-show="modalErrMsg">{{ modalErrMsg }}</p>
                <table class="table table-borderless">
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
                      <textarea type="text" class="form-control" v-model="clickedRow.title" rows="2"></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>詳細</td>
                    <td>
                      <textarea type="text" class="form-control" v-model="clickedRow.text" rows="2"></textarea>
                    </td>
                  </tr>
                </table>
              </div>

              <div class="modal-footer">
                <input type="submit" class="btn btn-primary" value="更新" />

                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="modalClose()">
                  キャンセル
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- 編集用モーダルEnd -->

      <!-- 削除用モーダルStart -->
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
              <p class="modal-title font-weight-bold text-secondary" id="myModalLabel">
                以下のお知らせを削除してよろしいですか？
              </p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form @submit.stop.prevent="deleteInformation" method="post">
              <div class="modal-body" v-show="clickedRow">
                <p class="text-danger" v-show="modalErrMsg">{{ modalErrMsg }}</p>
                <table class="table table-borderless">
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
                    <td>{{ clickedRow.title }}</td>
                  </tr>
                  <tr>
                    <td>詳細</td>
                    <td>{{ clickedRow.text }}</td>
                  </tr>
                </table>
              </div>

              <div class="modal-footer">
                <input type="submit" class="btn btn-danger" value="削除" />

                <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- 削除用モーダルEnd -->

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
      msg: "",
      errMsg: "",
      modalErrMsg: "",
      clickedRow: {},
      isLoading: false,
      updatedAt: null,
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
        await this.getInformation();
      } else {
        this.$router.push({ name: "signIn", params: { flashMsg: "サインインしてください" } });
      }
    } catch (e) {
      this.$router.push({ name: "signIn", params: { flashMsg: "サインインしてください" } });
    }
  },
  methods: {
    /**
     * お知らせ一覧取得
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
        this.errMsg = "お知らせ取得処理に失敗しました。";
        console.log(e);
      }
      this.isLoading = false;
    },

    /**
     * お知らせ登録
     */
    addInformation: async function () {
      this.msg = "";
      this.errMsg = "";
      this.isLoading = true;

      try {
        if (this.title == null || this.title === "") {
          this.modalErrMsg = "タイトルを入力してください";
          return;
        }

        if (this.title.length > 100) {
          this.modalErrMsg = "タイトルは100桁以下で入力してください";
          return;
        }

        if (this.content == null || this.content === "") {
          this.modalErrMsg = "詳細を入力してください";
          return;
        }

        if (this.content.length > 100) {
          this.modalErrMsg = "詳細は100桁以下で入力してください";
          return;
        }

        //値の格納
        const model = {
          title: this.title,
          content: this.content,
        };
        //登録
        $("#addModal").modal("hide");
        await AjaxUtil.postInformation(model);
        await this.getInformation();
        //テキストボックスの初期化
        this.title = "";
        this.content = "";
        this.msg = "登録に成功しました。";
      } catch (e) {
        this.msg = "";
        this.errMsg = "登録に失敗しました。";
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * お知らせ編集
     */
    updateInformation: async function () {
      this.msg = "";
      this.errMsg = "";
      this.isLoading = true;

      try {
        if (this.clickedRow.title == null || this.clickedRow.title === "") {
          this.modalErrMsg = "タイトルを入力してください";
          return;
        }

        if (this.clickedRow.title.length > 100) {
          this.modalErrMsg = "タイトルは100桁以下で入力してください";
          return;
        }

        if (this.clickedRow.text == null || this.clickedRow.text === "") {
          this.modalErrMsg = "詳細を入力してください";
          return;
        }

        if (this.clickedRow.text.length > 100) {
          this.modalErrMsg = "詳細は100桁以下で入力してください";
          return;
        }

        // 引数格納
        const model = {
          no: this.clickedRow.no,
          date: this.updatedAt,
          title: this.clickedRow.title,
          content: this.clickedRow.text,
        };
        //更新
        $("#updateModal").modal("hide");
        await AjaxUtil.putInformation(model);
        await this.getInformation();
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
        $("#deleteModal").modal("hide");
        await AjaxUtil.deleteInformation(this.clickedRow.no);
        await this.getInformation();
        this.msg = "お知らせ情報の削除に成功しました";
      } catch (e) {
        this.msg = "";
        this.errMsg = "お知らせ情報の削除に失敗しました";
        console.log(e);
      }

      this.isLoading = false;
    },

    /**
     * モーダルを開く処理
     */
    openModal: async function () {
      // モーダルのエラーメッセージ初期化
      this.modalErrMsg = "";
    },
  },
};
</script>
