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
          <p class="text-primary">{{ msg }}</p>
          <p class="text-danger">{{ errMsg }}</p>

          <!-- お知らせ欄 -->
          <div class="card shadow mb-4">
            <form @submit.stop.prevent="menu">
              <div class="card-header">
                <div class="d-flex">
                  <p class="font-weight-bold mt-2 mb-0">お知らせ一覧</p>
                  <div class="ml-auto">
                    <b-button
                      variant="primary btn-md"
                      data-toggle="modal"
                      data-target="#createmodal"
                      v-on:click="((addErrMsg = ''), (title = ''), (content = ''))"
                    >
                      新規登録
                    </b-button>
                  </div>
                </div>
              </div>

              <div class="card-body">
                <b-table responsive hover :items="items" :fields="fields" class="row row-cols-4 ml-0">
                  <!-- ボタンセル定義 -->
                  <template #cell(controls)="data">
                    <div>
                      <b-button-group class="d-flex justify-content-end">
                        <div>
                          <b-button
                            variant="outline-primary"
                            v-on:click="
                              ((clickedRow = {
                                title: data.item.title,
                                content: data.item.content,
                                no: data.item.no,
                                date: data.item.date,
                              }),
                              (updateErrMsg = ''))
                            "
                            data-toggle="modal"
                            data-target="#updatemodal"
                            class="mr-4"
                          >
                            編集
                          </b-button>
                        </div>

                        <div>
                          <b-button
                            variant="outline-danger"
                            v-on:click="
                              clickedRow = {
                                title: data.item.title,
                                content: data.item.content,
                                no: data.item.no,
                                date: data.item.date,
                              }
                            "
                            data-toggle="modal"
                            data-target="#deletemodal"
                          >
                            削除
                          </b-button>
                        </div>
                      </b-button-group>
                    </div>
                  </template>
                </b-table>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />

      <!--  登録モーダル -->
      <div
        class="modal fade"
        id="createmodal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="addModalLabel">
                以下の内容でお知らせを登録してよろしいですか？
              </div>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form @submit.stop.prevent="addInformation" method="post" name="informationSubmit">
              <div class="modal-body">
                <p class="text-danger">{{ addErrMsg }}</p>
                <tr class="align-top">
                  <td>タイトル</td>
                  <td>
                    <textarea
                      id="title"
                      class="form-control ml-5 mb-2"
                      v-model="title"
                      style="resize: none; width: 150%; font-size: small"
                      autocomplete="off"
                      name="title"
                    />
                  </td>
                </tr>
                <tr class="align-top">
                  <td>詳細</td>
                  <td>
                    <textarea
                      id="content"
                      class="form-control ml-5"
                      v-model="content"
                      style="resize: none; width: 150%; font-size: small"
                      autocomplete="off"
                      name="content"
                    />
                  </td>
                </tr>
              </div>
              <div class="modal-footer">
                <!-- 新規登録ボタン -->

                <div class="d-flex justify-content-md-center">
                  <input class="btn btn-primary mr-2" type="submit" value="登録" />

                  <b-button variant="secondary" type="submit" class="btn btn-default" data-dismiss="modal">
                    キャンセル
                  </b-button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- /modal -->

      <!-- 更新モーダル -->
      <div
        class="modal fade"
        id="updatemodal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="updateModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="updateModalLabel">
                以下の内容でお知らせを更新してよろしいですか？
              </div>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form @submit.stop.prevent="updateInformation" method="post">
              <div class="modal-body">
                <div>
                  <p class="text-danger">{{ updateErrMsg }}</p>
                  <tr>
                    <td>番号</td>
                    <td>
                      <div class="ml-5 mb-3">{{ clickedRow.no }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td>掲載日</td>
                    <td>
                      <div class="ml-5 mb-3">{{ clickedRow.date }}</div>
                    </td>
                  </tr>
                  <tr class="align-top">
                    <td>タイトル</td>
                    <td>
                      <textarea
                        id="updateTitle"
                        class="form-control ml-5 mb-2"
                        v-model="clickedRow.title"
                        style="resize: none; width: 150%; font-size: small"
                      />
                    </td>
                  </tr>
                  <tr class="align-top">
                    <td>詳細</td>
                    <td>
                      <textarea
                        id="updateContent"
                        class="form-control ml-5"
                        v-model="clickedRow.content"
                        style="resize: none; width: 150%; font-size: small"
                      />
                    </td>
                  </tr>
                </div>
              </div>
              <div class="modal-footer">
                <div class="d-flex justify-content-md-center">
                  <input class="btn btn-primary mr-2" type="submit" value="更新" />
                  <b-button variant="secondary" type="submit" class="btn btn-default" data-dismiss="modal">
                    キャンセル
                  </b-button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- /modal -->
    </div>

    <!--削除モーダル-->
    <div
      class="modal fade"
      id="deletemodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="deleteModalLabel">
              以下のお知らせを削除してよろしいですか？
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.stop.prevent="deleteInformation" method="delete">
            <div class="modal-body">
              <tr>
                <td class="text-nowrap">番号</td>
                <td>
                  <div class="ml-5 mb-3">{{ clickedRow.no }}</div>
                </td>
              </tr>
              <tr>
                <td class="text-nowrap">掲載日</td>
                <td>
                  <div class="ml-5 mb-3">{{ clickedRow.date }}</div>
                </td>
              </tr>
              <tr>
                <td class="text-nowrap">タイトル</td>
                <td>
                  <div class="ml-5 mb-3 text-break">{{ clickedRow.title }}</div>
                </td>
              </tr>
              <tr>
                <td class="text-nowrap">詳細</td>
                <td>
                  <div class="ml-5 text-break">{{ clickedRow.content }}</div>
                </td>
              </tr>
            </div>
            <div class="modal-footer">
              <!-- 削除ボタン -->

              <div class="d-flex justify-content-md-center">
                <button
                  type="button"
                  class="btn btn-danger mr-2"
                  data-dismiss="modal"
                  v-on:click="deleteInformation(clickedRow.no)"
                >
                  削除
                </button>

                <b-button variant="secondary" type="submit" class="btn btn-default" data-dismiss="modal">
                  キャンセル
                </b-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- /modal -->
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
import { deleteInformation } from "../utils/AjaxUtil";

export default {
  name: "InformationManager",
  props: ["flashMsg"],
  components: { NaviMenu, Menu, Footer, Loading },
  data() {
    return {
      msg: this.flashMsg,
      errMsg: "",
      clickedRow: {},
      isLoading: false,
      fields: [
        { key: "no", label: "番号", class: "col-1 text-nowrap" },
        { key: "date", label: "掲載日", class: "col-1" },
        {
          key: "title",
          label: "タイトル",
          class: "col-8",
        },
        { key: "controls", label: "", class: "text-nowrap" },
      ],
      items: [],
      addErrMsg: "",
      title: "",
      content: "",
    };
  },
  async mounted() {
    // サインイン確認
    try {
      if (UserUtil.isSignIn()) {
        this.msg = this.flashMsg;
        this.errMsg = this.flashErrMsg;
        await this.updateView();
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

    //お知らせ登録
    addInformation: async function () {
      this.msg = "";
      this.errMsg = "";
      this.addErrMsg = "";

      this.isLoading = true;

      try {
        // 入力チェック
        if (!this.title) {
          this.addErrMsg = "タイトルを入力してください";
          return;
        }

        if (this.title.length > 100) {
          this.addErrMsg = "タイトルは100桁以下で入力してください";
          return;
        }

        if (!this.content) {
          this.addErrMsg = "詳細を入力してください";
          return;
        }

        if (this.content.length > 100) {
          this.addErrMsg = "詳細は100桁以下で入力してください";
          return;
        }
        const model = {
          title: this.title,
          content: this.content,
        };
        await AjaxUtil.postInformation(model);

        document.getElementById("title").value = "";
        $("#createmodal").modal("hide");
        this.getInformation();
        this.title = "";
        this.content = "";
        this.msg = "登録に成功しました";
      } catch (e) {
        this.msg = "";
        this.errMsg = "登録に失敗しました";
        console.log(e);
        $("#createmodal").modal("hide");
      } finally {
        this.isLoading = false;
      }
    },
    //お知らせ更新
    updateInformation: async function () {
      // メッセージ初期化
      this.msg = "";
      this.errMsg = "";
      this.updateErrMsg = "";

      this.isLoading = true;

      try {
        // 入力チェック
        if (!this.clickedRow.title) {
          this.updateErrMsg = "タイトルを入力してください";
          return;
        }

        if (this.clickedRow.title.length > 100) {
          this.updateErrMsg = "タイトルは100桁以下で入力してください";
          return;
        }

        if (!this.clickedRow.content) {
          this.updateErrMsg = "詳細を入力してください";
          return;
        }

        if (this.clickedRow.content.length > 100) {
          this.updateErrMsg = "詳細は100桁以下で入力してください";
          return;
        }
        const model = {
          no: this.clickedRow.no,
          title: this.clickedRow.title,
          content: this.clickedRow.content,
        };

        await AjaxUtil.putInformation(model);
        this.msg = "更新に成功しました";
        $("#updatemodal").modal("hide");
        this.getInformation();
      } catch (e) {
        this.msg = "";
        this.errMsg = "更新に失敗しました";
        console.log(e);
        $("#updatemodal").modal("hide");
      } finally {
        this.isLoading = false;
      }
    },

    //お知らせ削除
    deleteInformation: async function (no) {
      // メッセージ初期化
      this.msg = "";
      this.errMsg = "";

      this.isLoading = true;
      const model = {
        no: no,
      };

      try {
        // 削除
        await AjaxUtil.deleteInformation(model);
        this.msg = "お知らせ情報の削除に成功しました";
        this.getInformation();
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
