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
          <!-- お知らせ一覧 -->
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <div class="d-flex justify-content-between">
                <div class="font-weight-bold text-primary text-secondary" style="align-content: center">
                  お知らせ一覧
                </div>
                <!-- 新規登録ボタン -->
                <button
                  type="button"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#addInfoModal"
                  v-on:click="
                    initModal({});
                    initMsg();
                  "
                >
                  新規登録
                </button>
              </div>
            </div>

            <form @submit.stop.prevent="menu">
              <div class="card-body">
                <b-table responsive hover :items="items" :fields="fields">
                  <!-- ボタンセル定義 -->
                  <!-- 編集・削除ボタン -->
                  <template #cell(controls)="data">
                    <div class="d-flex justify-content-end">
                      <b-button-group>
                        <b-button
                          variant="outline-primary"
                          v-on:click="
                            initModal(data.item);
                            initMsg();
                          "
                          data-toggle="modal"
                          data-target="#updateInfoModal"
                        >
                          編集
                        </b-button>
                      </b-button-group>
                      <b-button-group style="margin-left: 20px">
                        <b-button
                          variant="outline-danger"
                          v-on:click="initModal(data.item)"
                          data-toggle="modal"
                          data-target="#deleteInfoConfirmModal"
                        >
                          削除
                        </b-button>
                      </b-button-group>
                    </div>
                  </template>
                </b-table>
              </div>
            </form>
          </div>

          <br />
        </div>
      </div>
      <Footer />
    </div>
    <!-- お知らせ登録モーダル -->
    <div
      class="modal fade"
      id="addInfoModal"
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
          <div class="modal-body">
            <p class="text-danger" v-show="modalErrMsg">{{ modalErrMsg }}</p>

            <div class="d-flex flex-row">
              <div class="col-3">タイトル</div>
              <div class="form-group">
                <textarea
                  style="resize: none; overflow: hidden; white-space: break-spaces; line-break: anywhere"
                  rows="2"
                  cols="100"
                  id="title"
                  class="form-control"
                  v-model="title"
                  autocomplete="off"
                ></textarea>
              </div>
            </div>

            <div class="d-flex flex-row">
              <div class="col-3">詳細</div>
              <div class="form-group">
                <textarea
                  style="resize: none; overflow: hidden; white-space: break-spaces; line-break: anywhere"
                  rows="2"
                  cols="100"
                  id="content"
                  class="form-control"
                  v-model="content"
                  autocomplete="off"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="addInformation()">登録</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
          </div>
        </div>
      </div>
    </div>
    <!-- お知らせ更新モーダル -->
    <div
      class="modal fade"
      id="updateInfoModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title font-weight-bold text-primary text-secondary" id="myModalLabel">
              以下の内容でお知らせを更新してよろしいですか？
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style="line-height: 2.5">
            <p class="text-danger" v-show="modalErrMsg">{{ modalErrMsg }}</p>

            <div class="d-flex flex-row">
              <div class="col-3">番号</div>
              <div class="text">{{ no }}</div>
            </div>

            <div class="d-flex flex-row">
              <div class="col-3">掲載日</div>
              <div class="text">{{ date }}</div>
            </div>

            <div class="d-flex flex-row">
              <div class="col-3">タイトル</div>
              <div class="form-group" style="margin-top: 10px">
                <textarea
                  style="resize: none; overflow: hidden; white-space: break-spaces; line-break: anywhere"
                  rows="2"
                  cols="100"
                  id="title"
                  class="form-control"
                  v-model="title"
                  autocomplete="off"
                ></textarea>
              </div>
            </div>

            <div class="d-flex flex-row">
              <div class="col-3">詳細</div>
              <div class="form-group" style="margin-top: 10px">
                <textarea
                  style="resize: none; overflow: hidden; white-space: break-spaces; line-break: anywhere"
                  rows="2"
                  cols="100"
                  id="content"
                  class="form-control"
                  v-model="content"
                  autocomplete="off"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="updateInformation()">更新</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
          </div>
        </div>
      </div>
    </div>
    <!-- お知らせ削除モーダル -->
    <div
      class="modal fade"
      id="deleteInfoConfirmModal"
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
          <div class="modal-body" style="line-height: 2.5">
            <div class="d-flex flex-row">
              <div class="col-3">番号</div>
              <div class="text">{{ no }}</div>
            </div>

            <div class="d-flex flex-row">
              <div class="col-3">掲載日</div>
              <div class="text">{{ date }}</div>
            </div>

            <div class="d-flex flex-row">
              <div class="col-3">タイトル</div>
              <div class="text">{{ title }}</div>
            </div>

            <div class="d-flex flex-row">
              <div class="col-3">詳細</div>
              <div class="text">{{ content }}</div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-danger" v-on:click="deleteInformation()">削除</button>
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
  props: ["flashMsg", "flashErrMsg"],
  components: { NaviMenu, Menu, Footer, Loading },
  data() {
    return {
      msg: this.flashMsg,
      modalErrMsg: "",
      errMsg: "",
      isLoading: false,
      title: "",
      content: "",
      fields: [
        { key: "no", label: "番号" },
        { key: "date", label: "掲載日" },
        { key: "title", label: "タイトル" },
        { key: "controls", label: "" },
      ],
      items: [],
      no: "",
      date: "",
      title: "",
      content: "",
    };
  },
  async mounted() {
    try {
      if (UserUtil.isSignIn()) {
        // 画面更新
        await this.updateView();
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
      this.msg = "";
      this.errMsg = "";
      this.modalErrMsg = "";
      this.title = "";
      this.content = "";
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
      }

      this.isLoading = false;
    },
    /**
     * お知らせ新規登録
     */
    addInformation: async function () {
      // メッセージ初期化
      this.initMsg();

      try {
        // 入力チェック
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
        this.isLoading = true;
        $("#addInfoModal").modal("hide");
        // 引数格納
        const model = {
          title: this.title,
          content: this.content,
        };

        // 登録
        await AjaxUtil.postInformation(model);
        await this.getInformation();
        this.msg = "登録に成功しました";
      } catch (e) {
        this.msg = "";
        this.errMsg = "登録に失敗しました";
      } finally {
        this.isLoading = false;
      }
    },
    /**
     * お知らせ更新
     */
    updateInformation: async function () {
      // メッセージ初期化
      this.initMsg();

      try {
        // 入力チェック
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
        this.isLoading = true;
        $("#updateInfoModal").modal("hide");
        // 引数格納
        const model = {
          no: this.no,
          title: this.title,
          content: this.content,
        };

        //更新
        await AjaxUtil.putInformation(model);
        await this.getInformation();
        this.msg = "更新に成功しました";
      } catch (e) {
        this.msg = "";
        this.errMsg = "更新に失敗しました";
      } finally {
        this.isLoading = false;
      }
    },
    /**
     * お知らせ削除
     */
    deleteInformation: async function () {
      // メッセージ初期化
      this.initMsg();

      this.isLoading = true;
      $("#deleteInfoConfirmModal").modal("hide");
      try {
        // 削除
        await AjaxUtil.deleteInformation(this.no);
        await this.getInformation();
        this.msg = "お知らせ情報の削除に成功しました";
      } catch (e) {
        this.msg = "";
        this.errMsg = "お知らせ情報の削除に失敗しました";
      } finally {
        this.isLoading = false;
      }
    },
    /**
     * modalの値を初期化
     */
    initModal: function (modalInfo) {
      this.no = modalInfo.no;
      this.date = modalInfo.date;
      this.title = modalInfo.title;
      this.content = modalInfo.content;
    },

    /**
     * メッセージ初期化
     */
    initMsg: function () {
      this.msg = "";
      this.modalErrMsg = "";
      this.errMsg = "";
    },
  },
};
</script>
