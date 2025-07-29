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
                <button
                  type="button"
                  class="btn btn-primary"
                  v-on:click="onClickCreateButton"
                  data-toggle="modal"
                  data-target="#createModal"
                >
                  新規登録
                </button>
              </div>
            </div>
            <div class="card-body">
              <b-table responsive hover :items="items" :fields="fields" class="row row-cols-4 ml-0">
                <!-- ボタンセル定義 -->
                <template #cell(controls)="data">
                  <div class="d-flex justify-content-md-end">
                    <b-button-group>
                      <b-button
                        variant="outline-primary"
                        v-on:click="onClickEditButton(data.item)"
                        data-toggle="modal"
                        data-target="#editModal"
                      >
                        編集
                      </b-button>
                    </b-button-group>
                    <span style="padding-left: 30px"></span>
                    <b-button-group>
                      <b-button
                        variant="outline-danger"
                        v-on:click="onClickDeleteButton(data.item)"
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
      id="createModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="createModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title text-secondary" id="createModalLabel">
              以下の内容でお知らせを登録してよろしいですか？
            </h6>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- ここでモーダル用エラーメッセージを表示 -->
            <p class="text-danger" v-if="createModalErrMsg">{{ createModalErrMsg }}</p>
            <b-row class="mt-2">
              <b-col sm="3"><label>タイトル</label></b-col>
              <b-col sm="9">
                <textarea style="resize: none; font-size: smaller" class="form-control" v-model="title" />
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col sm="3"><label>詳細</label></b-col>
              <b-col sm="9">
                <textarea style="resize: none; font-size: smaller" class="form-control" v-model="content" />
              </b-col>
            </b-row>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addInformation">登録</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 編集用モーダル追加 -->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title text-secondary" id="editModalLabel">
              以下の内容でお知らせを更新してよろしいですか？
            </h6>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="text-danger" v-if="editModalErrMsg">{{ editModalErrMsg }}</p>
            <b-row class="mt-2">
              <b-col sm="3"><label>番号</label></b-col>
              <b-col sm="9"
                ><label>{{ editInfo.no }}</label></b-col
              >
            </b-row>
            <b-row class="mt-2">
              <b-col sm="3"><label>掲載日</label></b-col>
              <b-col sm="9"
                ><label>{{ editInfo.date }}</label></b-col
              >
            </b-row>
            <b-row class="mt-2">
              <b-col sm="3"><label>タイトル</label></b-col>
              <b-col sm="9">
                <textarea style="resize: none; font-size: smaller" class="form-control" v-model="editInfo.title" />
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col sm="3"><label>詳細</label></b-col>
              <b-col sm="9">
                <textarea style="resize: none; font-size: smaller" class="form-control" v-model="editInfo.content" />
              </b-col>
            </b-row>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="updateInformation">更新</button>
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
            <h6 class="modal-title text-secondary" id="myModalLabel">以下のお知らせを削除してよろしいですか？</h6>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- ここで削除モーダル用エラーメッセージを表示 -->
            <p class="text-danger" v-if="deleteErrMsg">{{ deleteErrMsg }}</p>
            <b-row class="mt-2">
              <b-col sm="3"><label>番号</label></b-col>
              <b-col sm="9"
                ><label>{{ deleteInfo.no }}</label></b-col
              >
            </b-row>
            <b-row class="mt-2">
              <b-col sm="3"><label>掲載日</label></b-col>
              <b-col sm="9"
                ><label>{{ deleteInfo.date }}</label></b-col
              >
            </b-row>
            <b-row class="mt-2">
              <b-col sm="3"><label>タイトル</label></b-col>
              <b-col sm="9"
                ><label>{{ deleteInfo.title }}</label></b-col
              >
            </b-row>
            <b-row class="mt-2">
              <b-col sm="3"><label>詳細</label></b-col>
              <b-col sm="9"
                ><label>{{ deleteInfo.content }}</label></b-col
              >
            </b-row>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteInformation">削除</button>
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
        { key: "no", label: "番号", class: "col-1 text-nowrap" },
        { key: "date", label: "掲載日", class: "col-1" },
        { key: "title", label: "タイトル", class: "col-8" },
        { key: "controls", label: "", class: "text-nowrap" },
      ],
      items: [],
      title: "",
      content: "",
      deleteInfo: {}, // 削除対象のお知らせ情報
      createModalErrMsg: "", // 新規登録モーダル用エラー
      deleteErrMsg: "", // 削除エラー
      editModalErrMsg: "", // 編集モーダル用エラー
      editInfo: {}, // 編集対象のお知らせ情報
    };
  },
  async mounted() {
    try {
      if (UserUtil.isSignIn()) {
        // 画面更新
        this.msg = this.flashMsg;
        this.errMsg = this.flashErrMsg;
        await this.getInformation();
      } else {
        this.$router.push({ name: "signIn", params: { flashMsg: "サインインしてください" } });
      }
    } catch (e) {
      this.errMsg = e.message;
      this.$router.push({ name: "signIn", params: { flashMsg: "サインインしてください" } });
    }
  },

  methods: {
    /**
     * 画面更新
     */

    /**
     * お知らせ検索
     */
    async getInformation() {
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
    onClickCreateButton(data) {
      this.title = "";
      this.content = "";
      this.createModalErrMsg = ""; // エラーメッセージを初期化
    },
    async addInformation() {
      // 入力チェック
      this.createModalErrMsg = "";
      // タイトルの入力チェック
      if (!this.title) {
        this.createModalErrMsg = "タイトルを入力してください";
        return;
      }
      // タイトルの入力桁数チェック
      if (this.title.length > 100) {
        this.createModalErrMsg = "タイトルは100桁以下で入力してください";
        return;
      }
      // 詳細の入力チェック
      if (!this.content) {
        this.createModalErrMsg = "詳細を入力してください";
        return;
      }
      // 詳細の入力桁数チェック
      if (this.content.length > 100) {
        this.createModalErrMsg = "詳細は100桁以下で入力してください";
        return;
      }
      // ローディング設定
      this.isLoading = true;
      try {
        // お知らせ新規登録処理
        await AjaxUtil.postInformation({ title: this.title, content: this.content });

        // メッセージ表示
        this.msg = "登録に成功しました";
        this.errMsg = "";
        // お知らせ一覧取得処理
        await this.getInformation();
        // タイトルと詳細のフィールドをクリア
        this.title = "";
        this.content = "";
      } catch (e) {
        // エラー時は一覧画面にエラーメッセージ表示

        this.errMsg = "登録に失敗しました";
        this.msg = "";
      } finally {
        // ローディング設定解除
        this.isLoading = false;
      }
      $("#createModal").modal("hide");
    },

    onClickEditButton(item) {
      this.editInfo = { ...item };
      this.editModalErrMsg = "";
    },

    async updateInformation() {
      // 入力チェック
      this.editModalErrMsg = "";
      // タイトルの入力チェック
      if (!this.editInfo.title) {
        this.editModalErrMsg = "タイトルを入力してください";
        return;
      }
      // タイトルの入力桁数チェック
      if (this.editInfo.title.length > 100) {
        this.editModalErrMsg = "タイトルは100桁以下で入力してください";
        return;
      }
      // 詳細の入力チェック
      if (!this.editInfo.content) {
        this.editModalErrMsg = "詳細を入力してください";
        return;
      }
      // 詳細の入力桁数チェック
      if (this.editInfo.content.length > 100) {
        this.editModalErrMsg = "詳細は100桁以下で入力してください";
        return;
      }
      // ローディング設定
      this.isLoading = true;
      try {
        // お知らせ更新処理
        await AjaxUtil.putInformation({
          no: this.editInfo.no,
          title: this.editInfo.title,
          content: this.editInfo.content,
        });

        // お知らせ一覧取得処理
        await this.getInformation();
        // メッセージ表示
        this.msg = "更新に成功しました";
        this.errMsg = "";
      } catch (e) {
        // エラー時は一覧画面にエラーメッセージ表示

        this.errMsg = "更新に失敗しました";
        this.msg = "";
      } finally {
        // ローディング設定解除
        this.isLoading = false;
      }
      $("#editModal").modal("hide");
    },

    onClickDeleteButton(item) {
      this.deleteInfo = { ...item };
    },

    async deleteInformation() {
      this.deleteErrMsg = ""; // 削除用エラー初期化
      try {
        await AjaxUtil.deleteInformation(this.deleteInfo.no);
        this.msg = "お知らせ情報の削除に成功しました";
        this.errMsg = "";
        await this.getInformation();
      } catch (e) {
        this.errMsg = "お知らせ情報の削除に失敗しました";
        this.msg = "";
      }
    },
  },
};
</script>
