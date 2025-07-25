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

          <div class="form-group my-2">
            <div class="col-lg-13 mb-4">
              <!-- Illustrations -->
              <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex justify-content-between align-items-center">
                  <div class="m-0">
                    <h6 class="font-weight-bold">お知らせ一覧</h6>
                  </div>
                  <button
                    class="btn-primary btn-sm px-2"
                    v-on:click="
                      resetModalValue();
                      resetModalMsg();
                    "
                    data-toggle="modal"
                    data-target="#createConfirmModal"
                  >
                    新規登録
                  </button>
                </div>
                <div class="card-body">
                  <div class="ml-2 mb-3">
                    <!-- お知らせ一覧 -->
                    <form @submit.stop.prevent="menu">
                      <b-table responsive hover :items="items" :fields="fields">
                        <!-- ボタンセル定義 -->
                        <template #cell(controls)="data">
                          <div class="d-flex gap-2 justify-content-end">
                            <b-button-group>
                              <b-button
                                variant="outline-primary"
                                v-on:click="
                                  clickedRow = {
                                    no: data.item.no,
                                    date: data.item.date,
                                    title: data.item.title,
                                    content: data.item.content,
                                  };
                                  resetModalMsg();
                                "
                                data-toggle="modal"
                                data-target="#updateConfirmModal"
                                class="mr-md-4"
                                >編集</b-button
                              >
                            </b-button-group>
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
                                type="submit"
                                data-toggle="modal"
                                data-target="#deleteConfirmModal"
                                >削除</b-button
                              >
                            </b-button-group>
                          </div>
                        </template>
                      </b-table>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>

    <!-- 新規登録モーダル -->
    <div
      class="modal fade"
      id="createConfirmModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
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

          <!--お知らせ新規登録入力フォーム-->
          <form name="addInformation" @submit.stop.prevent="addInformation" method="post">
            <div class="modal-body">
              <p class="text-danger" v-show="modalErrMsg">{{ modalErrMsg }}</p>

              <!-- タイトル -->
              <div class="form-group d-flex flex-row mb-6">
                <label class="col-3">タイトル</label>
                <textarea
                  rows="2"
                  cols="20"
                  id="title"
                  class="form-control"
                  v-model="title"
                  autocomplete="off"
                ></textarea>
              </div>

              <!-- 詳細 -->
              <div class="form-group d-flex flex-row mb-6">
                <label class="col-3">詳細</label>
                <textarea
                  rows="2"
                  cols="20"
                  id="content"
                  class="form-control"
                  v-model="content"
                  autocomplete="off"
                ></textarea>
              </div>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">登録</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- 編集確認モーダル -->
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

          <!--選択したお知らせ情報表示-->
          <form name="updateInformation" @submit.stop.prevent="updateInformation" method="post">
            <div class="modal-body">
              <p class="text-danger" v-show="modalErrMsg">{{ modalErrMsg }}</p>

              <div class="d-flex flex-row mb-sm-2">
                <div class="col-3">番号</div>
                <div v-show="clickedRow">
                  <h6 class="font-weight-normal">{{ clickedRow.no }}</h6>
                </div>
              </div>

              <div class="d-flex flex-row mb-sm-2">
                <div class="col-3">掲載日</div>
                <div v-show="clickedRow">
                  <h6 class="font-weight-normal">{{ clickedRow.date }}</h6>
                </div>
              </div>

              <!-- タイトル -->
              <div class="form-group d-flex flex-row mb-6">
                <label class="col-3">タイトル</label>
                <textarea
                  rows="2"
                  cols="20"
                  id="title"
                  class="form-control"
                  v-model="clickedRow.title"
                  autocomplete="off"
                ></textarea>
              </div>

              <!-- 詳細 -->
              <div class="form-group d-flex flex-row mb-6">
                <label class="col-3">詳細</label>
                <textarea
                  rows="2"
                  cols="20"
                  id="content"
                  class="form-control"
                  v-model="clickedRow.content"
                  autocomplete="off"
                ></textarea>
              </div>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">更新</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
            </div>
          </form>
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
            <!--選択したお知らせ情報確認-->
            <div class="d-flex flex-row mb-sm-2">
              <div class="col-3">番号</div>
              <div v-show="clickedRow">
                <h6 class="font-weight-normal">{{ clickedRow.no }}</h6>
              </div>
            </div>

            <div class="d-flex flex-row mb-sm-2">
              <div class="col-3">掲載日</div>
              <div v-show="clickedRow">
                <h6 class="font-weight-normal">{{ clickedRow.date }}</h6>
              </div>
            </div>

            <div class="d-flex flex-row mb-sm-2">
              <div class="col-3">タイトル</div>
              <div v-show="clickedRow">
                <h6 class="font-weight-normal">{{ clickedRow.title }}</h6>
              </div>
            </div>

            <div class="d-flex flex-row mb-6">
              <div class="col-3">詳細</div>
              <div v-show="clickedRow">
                <h6 class="font-weight-normal">{{ clickedRow.content }}</h6>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-danger" v-on:click="deleteInformation()" data-dismiss="modal">
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
      modalErrMsg: "",
      isLoading: false,
      clickedRow: {},
      /**
       * お知らせ一覧
       *
       * <DB取得項目>
       *　no:番号
       *　date:掲載日
       *　title:タイトル
       *　content:詳細
       */
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
        this.msg = "";
        // 画面更新
        await this.getInformation();
      } else {
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

    /**
     * お知らせ新規登録
     */
    addInformation: async function () {
      // メッセージ初期化
      this.msg = "";
      this.errMsg = "";
      this.modalErrMsg = "";

      try {
        // 入力チェック
        if (this.title == null || this.title === "") {
          this.modalErrMsg = "タイトルを入力してください";
          return;
        }

        if (this.title.length >= 101) {
          this.modalErrMsg = "タイトルは100桁以下で入力してください";
          return;
        }

        if (this.content == null || this.content === "") {
          this.modalErrMsg = "詳細を入力してください";
          return;
        }

        if (this.content.length >= 101) {
          this.modalErrMsg = "詳細は100桁以下で入力してください";
          return;
        }

        this.isLoading = true;

        //　モーダルを閉じる
        $("#createConfirmModal").modal("hide");

        // 引数格納
        const model = {
          title: this.title,
          content: this.content,
        };

        // 登録
        await AjaxUtil.postInformation(model);

        // 画面更新
        await this.getInformation();

        this.msg = "登録に成功しました";
      } catch (e) {
        this.msg = "";
        this.errMsg = "登録に失敗しました";
        console.log(e);
      }

      this.isLoading = false;
    },

    /**
     * お知らせ更新
     */
    updateInformation: async function () {
      // メッセージ初期化
      this.msg = "";
      this.errMsg = "";
      this.modalErrMsg = "";

      try {
        // 入力チェック
        if (this.clickedRow.title == null || this.clickedRow.title === "") {
          this.modalErrMsg = "タイトルを入力してください";
          return;
        }

        if (this.clickedRow.title.length >= 101) {
          this.modalErrMsg = "タイトルは100桁以下で入力してください";
          return;
        }

        if (this.clickedRow.content == null || this.clickedRow.content === "") {
          this.modalErrMsg = "詳細を入力してください";
          return;
        }

        if (this.clickedRow.content.length >= 101) {
          this.modalErrMsg = "詳細は100桁以下で入力してください";
          return;
        }

        this.isLoading = true;

        // モーダルを閉じる
        $("#updateConfirmModal").modal("hide");

        // 引数格納
        const model = {
          no: this.clickedRow.no,
          title: this.clickedRow.title,
          content: this.clickedRow.content,
        };

        // 更新
        await AjaxUtil.putInformation(model);

        // 画面更新
        await this.getInformation();

        this.msg = "更新に成功しました";
      } catch (e) {
        this.msg = "";
        this.errMsg = "更新に失敗しました";
        console.log(e);
      }

      this.isLoading = false;
    },

    /**
     * お知らせ削除
     */
    deleteInformation: async function () {
      // メッセージ初期化
      this.msg = "";
      this.errMsg = "";

      try {
        this.isLoading = true;

        // モーダルを閉じる
        $("#deleteConfirmModal").modal("hide");

        // 削除
        await AjaxUtil.deleteInformation(this.clickedRow.no);

        // 画面更新
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
     * モーダル入力値初期化
     */
    resetModalValue: function () {
      this.title = "";
      this.content = "";
    },

    /**
     * モーダルエラーメッセージ初期化
     */
    resetModalMsg: function () {
      this.modalErrMsg = "";
    },
  },
};
</script>
