<template>
  <div class="maintebook">
    <NaviMenu />

    <div id="wrapper">
      <Menu />

      <div id="content-wrapper" class="bg-light">
        <div class="container-fluid">
          <!-- Breadcrumbs-->
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link tag="a" :to="{ name: 'top' }">トップページ</router-link>
            </li>
            <li class="breadcrumb-item active">書籍管理</li>
          </ol>

          <p class="text-primary" v-show="msg">{{ msg }}</p>
          <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

          <!-- 登録する書籍名入力欄 -->
          <div class="continer" style="font-size: 10pt">
            <div class="form-group m-2">
              <div class="px-2">書籍名を検索</div>
              <div class="row">
                <div class="col-lg-6">
                  <input
                    type="text"
                    id="searchWord"
                    class="form-control"
                    v-model="searchWord"
                    placeholder="入力してください"
                    required
                  />
                </div>
                <button class="btn-primary btn-sm" v-on:click="searchBooks()">
                  検索
                </button>
              </div>
            </div>
          </div>

          <hr>

          <!-- Result Area -->
          <div class="row">
            <div
              class="col-lg-6 mb-4"
              v-for="(row, key, index) in items"
              :key="index"
            >
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <div class="m-0 font-weight-bold text-primary text-secondary">
                    {{ row.title }}
                  </div>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-2 mb-2 mr-1" style="min-width: 8rem">
                      <div class="row text-left ml-2 mb-3">
                        <img
                          style="height: 7rem; width: 7rem"
                          v-if="
                            row.imgUrl === undefinded ||
                            row.imgUrl === null ||
                            row.imgUrl === ''
                          "
                          src="../../public/image/no-image.png"
                        />
                        <a
                          href="#"
                          onclick="return false;"
                          v-if="
                            row.imgUrl !== undefinded &&
                            row.imgUrl !== null &&
                            row.imgUrl !== ''
                          "
                        >
                          <img
                            style="height: 10rem; width: 7rem"
                            v-bind:src="row.imgUrl"
                            alt=""
                            v-on:click="
                              clickedRow = {
                                title: row.title,
                                imgUrl: row.imgUrl,
                                description: row.description,
                              }
                            "
                            data-toggle="modal"
                            data-target="#imagemodal"
                          />
                        </a>
                      </div>
                    </div>

                    <div class="col-sm-8 ml-2 mb-2 text-left">
                      <div class="table-responsive">
                        <table
                          class="
                            table
                            table-sm
                            table-striped
                            table-height-sm
                            table-condensed
                          "
                          style="font-size: 10pt"
                        >
                          <tbody>
                            <tr>
                              <td>在庫</td>
                              <td>
                                {{
                                  row.isMaster ? "本棚にあります" : "未入庫"
                                }}&nbsp;
                              </td>
                            </tr>
                            <tr>
                              <td>操作</td>
                              <td>
                                <a
                                  href="#"
                                  v-if="row.isMaster === true"
                                  v-on:click="deleteBook(row.title)"
                                  >&nbsp;
                                  <i class="fas fa-fw fa-file-export"></i>
                                  <span>マスタ削除</span>
                                </a>
                                <a
                                  href="#"
                                  v-else
                                  v-on:click="
                                    addBook(
                                      row.title,
                                      row.isbn_13,
                                      row.description,
                                      row.imgUrl
                                    )
                                  "
                                  >&nbsp;
                                  <i class="fas fa-fw fa-file-export"></i>
                                  <span>登録</span>
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <!-- モーダルの設定です -->
      <div
        class="modal fade"
        id="imagemodal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div
                class="
                  modal-title
                  m-0
                  font-weight-bold
                  text-primary text-secondary
                "
                id="myModalLabel"
                v-show="clickedRow"
              >
                {{ clickedRow.title }}
              </div>
            </div>
            <div class="modal-body">
              <img
                v-bind:src="clickedRow.imgUrl"
                id="imagepreview"
                class="img-responsive"
              />
              <div class="mt-4 mb-2">概要</div>
              <div class="multiline-text" v-show="clickedRow">
                {{ clickedRow.description }}
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
                v-on:click="
                  clickedRow.imgUrl = '';
                  clickedRow.description = '';
                "
              >
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- /modal -->
    </div>

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

    <loading v-if="isLoading === true" />
  </div>
</template>

<script>
import Vue from "vue";
import * as UserUtil from "@/utils/UserUtil";
import * as AjaxUtil from "@/utils/AjaxUtil";
// 共通
import NaviMenu from "../components/NaviMenu.vue";
import "../utils/sb-admin";
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";
import Loading from "../components/Loading.vue";

export default {
  name: "MainteBook",
  props: ["flashMsg", "flashErrMsg"],
  components: { NaviMenu, Menu, Footer, Loading },
  data() {
    return {
      msg: "",
      errMsg: "",
      items: [],
      userName: "",
      clickedRow: {},
      searchWord: "",
      isLoading: false,
    };
  },
  methods: {
    // 書籍検索
    searchBooks: function () {
      this.isLoading = true;

      this.msg = "";
      this.errMsg = "";
      this.items = [];

      if (!this.searchWord || this.searchWord === "") {
        this.msg = "";
        this.errMsg = "検索条件を入力してください";
        this.isLoading = false;
        return;
      }

      // APIで検索
      AjaxUtil.searchBooks(this.searchWord)
        .then((response) => {
          let searchResultBooks = response.data.items;

          // 要素詰め替え
          searchResultBooks.forEach((result) => {
            // タイトル
            try {
              result.title = result.volumeInfo.title;
            } catch {
              result.title = "";
            }

            // ISBN番号(10)取得
            result.isbn_10 = "";
            try {
              result.volumeInfo.industryIdentifiers.forEach((identifier) => {
                if (identifier.type === "ISBN_10")
                  result.isbn_10 = identifier.identifier;
              });
            } catch {
              //
            }

            // ISBN番号取得
            result.isbn_13 = "";
            try {
              result.volumeInfo.industryIdentifiers.forEach((identifier) => {
                if (identifier.type === "ISBN_13")
                  result.isbn_13 = identifier.identifier;
              });
            } catch {
              //
            }

            // 内容
            try {
              result.description = result.volumeInfo.description;
            } catch {
              result.description = "";
            }

            // サムネイル画像URL
            try {
              const image = new Image();
              image.src = result.volumeInfo.imageLinks.thumbnail;
              result.imgUrl = image.src;
            } catch {
              result.imgUrl = "";
            }
          });

          // マスタ登録済みか
          AjaxUtil.getAllSapBooks()
            .then((response) => {
              let masterBooks = JSON.parse(response.data.Items);

              searchResultBooks.forEach((result) => {
                result.isMaster = masterBooks.some((masterBook) => {
                  return (
                    (result.isbn_10 != "" &&
                      result.isbn_10 === masterBook.isbn) ||
                    (result.isbn_13 != "" && result.isbn_13 === masterBook.isbn)
                  );
                });
              });

              // データセット
              this.items = searchResultBooks;
              this.isLoading = false;
            })
            .catch((error) => {
              this.msg = "";
              this.errMsg = "書籍取得に失敗しました";
              console.log(error);
              this.isLoading = false;
            });
        })
        .catch((error) => {
          this.msg = "";
          this.errMsg = "検索に失敗しました";
          console.log(error);
          this.isLoading = false;
        });
    },
    addBook: function (title, isbn, description, imgUrl) {
      //パラメータ補正
      // 説明を最大文字数内に補正する
      const descriptionMaxLength = 1024;
      description = description.substr(0, descriptionMaxLength);
      const addBookModel = {
        isbn: isbn,
        title: title,
        book_id: "1",
        description: description,
        img_url: imgUrl,
      };
      this.isLoading = true;

      if (UserUtil.isSignIn()) {
        AjaxUtil.addBook(addBookModel)
          .then((response) => {
            this.searchBooks();
          })
          .catch((error) => {
            this.msg = "";
            this.errMsg = "登録処理に失敗しました";
            console.log(error);
            this.isLoading = false;
          });
      } else {
        this.$router.push({
          name: "signin",
          params: { flashMsg: "サインインしてください" },
        });
      }
    },
    deleteBook: function (title) {
      this.isLoading = true;

      if (UserUtil.isSignIn()) {
        AjaxUtil.deleteBook(title)
          .then((response) => {
            this.searchBooks();
          })
          .catch((error) => {
            this.msg = "";
            this.errMsg = "削除処理に失敗しました";
            console.log(error);
            this.isLoading = false;
          });
      } else {
        this.$router.push({
          name: "signin",
          params: { flashMsg: "サインインしてください" },
        });
      }
    },
  },
};
</script>
