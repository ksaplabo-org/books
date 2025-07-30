<template>
  <div>
    <NaviMenu />

    <div id="wrapper">
      <Menu />

      <div id="content-wrapper" class="menu bg-light">
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

          <br />

          <!-- お知らせ欄 -->
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <div class="d-flex justify-content-between">
                <b>お知らせ一覧</b>
                <button
                  class="btn-primary btn-sm"
                  data-toggle="modal"
                  data-target="#addModal"
                  v-on:click="
                    title = '';
                    text = '';
                    addInfoErrMsg = '';
                    msg = '';
                    errMsg = '';
                  "
                >
                  新規登録
                </button>
              </div>
            </div>
            <div class="card-body">
              <b-table responsive hover :items="items" :fields="fields">
                <!-- ボタンセル定義 -->
                <template #cell(controls)="data">
                  <b-button
                    class="editButton"
                    variant="outline-primary"
                    v-on:click="
                      clickedRow = {
                        no: data.item.no,
                        date: data.item.date,
                        title: data.item.title,
                        text: data.item.content,
                      };
                      editInfoErrMsg = '';
                      msg = '';
                      errMsg = '';
                    "
                    data-toggle="modal"
                    data-target="#editModal"
                  >
                    編集
                  </b-button>

                  <b-button
                    class="deleteButton"
                    variant="outline-danger"
                    v-on:click="
                      clickedRow = {
                        no: data.item.no,
                        date: data.item.date,
                        title: data.item.title,
                        text: data.item.content,
                      };
                      msg = '';
                      errMsg = '';
                    "
                    data-toggle="modal"
                    data-target="#deleteConfirmModal"
                  >
                    削除
                  </b-button>
                </template>
              </b-table>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <!--登録 モーダル -->
      <div
        class="modal fade"
        id="addModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
        data-backdrop="static"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div
                class="modal-title m-0 font-weight-bold text-primary text-secondary"
                id="myModalLabel"
                style="font-size: 15px"
              >
                以下の内容でお知らせを登録してよろしいですか？
              </div>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" style="font-size: 15px">
              <p class="text-danger" v-show="addInfoErrMsg">{{ addInfoErrMsg }}</p>
              <form>
                <div class="row mb-3">
                  <label for="informationTitle" class="col-sm-3 col-form-label">タイトル</label>
                  <div class="col-sm-9">
                    <textarea
                      type="text"
                      class="form-control"
                      id="informationTitle"
                      v-model="title"
                      style="height: 60px; resize: none"
                    >
                    </textarea>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="informationText" class="col-sm-3 col-form-label">詳細</label>
                  <div class="col-sm-9">
                    <textarea
                      type="text"
                      class="form-control"
                      id="informationText"
                      v-model="text"
                      style="height: 60px; resize: none"
                    >
                    </textarea>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" v-on:click="addInformation()">登録</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
            </div>
          </div>
        </div>
      </div>
      <!-- /modal -->
    </div>

    <!-- 更新 モーダル -->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div
              class="modal-title m-0 font-weight-bold text-primary text-secondary"
              id="myModalLabel"
              style="font-size: 15px"
            >
              以下の内容でお知らせを更新してよろしいですか？
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style="font-size: 15px">
            <p class="text-danger" v-show="editInfoErrMsg">{{ editInfoErrMsg }}</p>
            <div class="row mb-3">
              <div class="col-sm-3">番号</div>
              <div class="col-sm-9">
                {{ clickedRow.no }}
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-3">掲載日</div>
              <div class="col-sm-9">
                {{ clickedRow.date }}
              </div>
            </div>
            <form>
              <div class="row mb-3">
                <label for="informationTitle" class="col-sm-3 col-form-label">タイトル</label>
                <div class="col-sm-9">
                  <textarea
                    type="text"
                    class="form-control"
                    id="informationTitle"
                    v-model="clickedRow.title"
                    style="height: 70px; resize: none"
                  >
                  </textarea>
                </div>
              </div>

              <div class="row mb-3">
                <label for="informationText" class="col-sm-3 col-form-label">詳細</label>
                <div class="col-sm-9">
                  <textarea
                    type="text"
                    class="form-control"
                    id="informationText"
                    v-model="clickedRow.text"
                    style="height: 70px; resize: none"
                  >
                  </textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="updateInformation()">更新</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
          </div>
        </div>
      </div>
    </div>
    <!-- /modal -->

    <!-- 削除確認モーダル -->
    <div
      class="modal fade"
      id="deleteConfirmModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div
              class="modal-title m-0 font-weight-bold text-primary text-secondary"
              id="myModalLabel"
              style="font-size: 15px"
            >
              以下のお知らせを削除してよろしいですか？
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style="font-size: 15px">
            <div class="row mb-3">
              <div class="col-sm-3">番号</div>
              <div class="col-sm-9">
                {{ clickedRow.no }}
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-3">掲載日</div>
              <div class="col-sm-9">
                {{ clickedRow.date }}
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-3">タイトル</div>
              <div class="col-sm-9">
                {{ clickedRow.title }}
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-3">詳細</div>
              <div class="col-sm-9">
                {{ clickedRow.text }}
              </div>
            </div>
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
    <!-- /modal -->

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
      addInfoErrMsg: "",
      editInfoErrMsg: "",
      clickedRow: {},
      isLoading: false,
      no: "",
      date: "",
      title: "",
      text: "",
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
        // 画面呼び出し
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
     * お知らせ一覧
     */
    getInformation: async function () {
      this.isLoading = true;

      this.msg = "";
      this.errMsg = "";

      // お知らせ取得

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
      this.msg = "";
      this.errMsg = "";
      this.addInfoErrMsg = "";

      this.isLoading = true;

      try {
        //タイトルの入力チェック
        if (this.title == null || this.title == "") {
          this.addInfoErrMsg = "タイトルを入力してください";
          return;
        }

        //タイトルの入力桁数チェック
        if (this.title.length > 100) {
          this.addInfoErrMsg = "タイトルは100桁以下で入力してください";
          return;
        }

        //詳細の入力チェック
        if (this.text == null || this.text == "") {
          this.addInfoErrMsg = "詳細を入力してください";
          return;
        }

        //詳細の入力桁数チェック
        if (this.text.length > 100) {
          this.addInfoErrMsg = "詳細は100桁以下で入力してください";
          return;
        }

        //引数格納
        const info = {
          title: this.title,
          text: this.text,
        };

        //登録
        await AjaxUtil.postInformation(info);
        await this.getInformation();
        this.msg = "登録に成功しました";
      } catch (e) {
        this.msg = "";
        this.errMsg = "登録に失敗しました。";
        console.log(e);
      } finally {
        this.isLoading = false;
      }
      $("#addModal").modal("hide");
    },

    /**
     * お知らせ更新
     */
    updateInformation: async function () {
      this.msg = "";
      this.errMsg = "";
      this.editInfoErrMsg = "";

      this.isLoading = true;

      try {
        //タイトルの入力チェック
        if (this.clickedRow.title == null || this.clickedRow.title == "") {
          this.editInfoErrMsg = "タイトルを入力してください";
          return;
        }

        //タイトルの入力桁数チェック
        if (this.clickedRow.title.length > 100) {
          this.editInfoErrMsg = "タイトルは100桁以下で入力してください";
          return;
        }

        //詳細の入力チェック
        if (this.clickedRow.text == null || this.clickedRow.text == "") {
          this.editInfoErrMsg = "詳細を入力してください";
          return;
        }

        //詳細の入力桁数チェック
        if (this.clickedRow.text.length > 100) {
          this.editInfoErrMsg = "詳細は100桁以下で入力してください";
          return;
        }

        //引数格納
        const info = {
          no: this.clickedRow.no,
          title: this.clickedRow.title,
          text: this.clickedRow.text,
        };

        //登録
        await AjaxUtil.putInformation(info);
        await this.getInformation();
        this.msg = "更新に成功しました";
      } catch (e) {
        this.msg = "";
        this.errMsg = "更新に失敗しました。";
        console.log(e);
      } finally {
        this.isLoading = false;
      }
      $("#editModal").modal("hide");
    },

    /**
     * お知らせ削除
     */
    deleteInformation: async function () {
      this.msg = "";
      this.errMsg = "";
      this.isLoading = true;

      try {
        this.no = this.clickedRow.no;
        await AjaxUtil.deleteInformation(this.no);
        await this.getInformation();
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
