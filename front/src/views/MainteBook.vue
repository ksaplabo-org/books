<template>
  <div class="maintebook">
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
            <li class="breadcrumb-item active">書籍管理</li>
          </ol>

          <p class="text-primary" v-show="msg">{{ msg }}</p>
          <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

          <!-- 書籍検索欄 -->
          <div class="continer" style="font-size: 10pt">
            <div class="form-group m-2">
              <div class="px-2">書籍名を検索</div>
              <div class="row">
                <div class="col-lg-6">
                  <input type="text" id="searchWord" class="form-control" v-model="searchWord" placeholder="入力してください" required/>
                </div>
                <button class="btn-primary btn-sm" v-on:click="searchBooks()">検索</button>
              </div>
            </div>
          </div>

          <hr>

          <!-- 検索結果表示欄 -->
          <div class="row">
            <div class="col-lg-6 mb-4" v-for="(row, key, index) in items" :key="index">
              
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
                        <b-table striped responsive hover :items="[{'stock': row.stock}]" :fields="fields">
                            <template #cell(addBtn)="data">
                                <b-button-group>
                                    <b-button variant="outline-primary" v-on:click="onClickEditButton(row.item)">
                                        追加
                                    </b-button>
                                </b-button-group>
                            </template>
                            <template #cell(delBtn)="data">
                                <b-button-group>
                                    <b-button variant="outline-danger" data-toggle="modal" data-target="#deleteStockModal" v-on:click="onClickDeleteButton(row.isbn_13)">
                                      削除
                                    </b-button>
                                </b-button-group>
                            </template>
                        </b-table>
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

      <!-- 書籍詳細モーダル -->
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

      <!-- 削除確認モーダル -->
      <div class="modal fade" id="deleteStockModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="myModalLabel">削除確認</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                      <!-- 削除モーダル用のエラーメッセージ -->
                      <p class="text-danger" v-show="delErrMsg">{{ delErrMsg }}</p>

                      <br>

                      <label for="bookIdList">削除するbook idを選択してください。</label>
                      <select class="form-control" id="bookIdList" v-model="delBookId"></select>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="deleteBook()">削除</button>
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
                  </div>
              </div>
          </div>
      </div>
    </div>

    <!-- スクロールトップボタン -->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

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
  name: "MainteBook",
  props: ["flashMsg", "flashErrMsg"],
  components: { NaviMenu, Menu, Footer, Loading },
  data() {
    return {
      msg: "",
      errMsg: "",
      delErrMsg: "",
      items: [],
      clickedRow: {},
      searchWord: "",
      isLoading: false,
      fields: [
        {key: "stock", label: "在庫"},
        {key: "addBtn", label: ""},
        {key: "delBtn", label: ""}
      ],
      delBookId:''
    };
  },
  methods: {
    // 書籍検索処理
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

            // ISBN13桁がない書籍は登録できないので表示対象外
            if (result.isbn_13 === "") {
              return;
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

            // 在庫数
            try {
              result.stock = 0;
              AjaxUtil.getBook(result.isbn_13)
                .then((book) => {
                  const item = JSON.parse(book.data.Items);
                  if (item.length !== 0) {
                    result.stock = item[0].stock;
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            } catch {
              //
            }
            this.items.push(result);
          });
        })
        .catch((error) => {
          this.msg = "";
          this.errMsg = "検索に失敗しました";
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    // 書籍追加処理
    addBook: function (title, isbn, description, imgUrl) {
      //パラメータ補正
      // 説明を最大文字数内に補正する
      const descriptionMaxLength = 1024;
      description = description.substr(0, descriptionMaxLength);
      const addBookModel = {
        isbn: isbn,
        title: title,
        // ★book idは動的にする。※backendの責務★
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
    // 削除ボタン押下イベント
    onClickDeleteButton: function(isbn) {
      this.delErrMsg = "";
      this.isLoading = true;
      
      const select = document.getElementById("bookIdList");
      // book_idセレクトボックスを初期化
      this.delBookId = "";
      while(select.lastChild) {
        select.removeChild(select.lastChild);
      }

      // isbnからbook idの一覧を取得する
      AjaxUtil.getBookIdList(isbn)
        .then((response) => {
          const bookIdList = JSON.parse(response.data.Items);
          // ★取得形式が「配列 in Map」となっているので、「配列 in 文字列」に修正する★
          for (const el of bookIdList) {
            let option = document.createElement('option');
            option.text = el.book_id;
            option.value = el.book_id;
            select.appendChild(option);
          }
        })
        .catch((e) => {
          this.msg = "";
          // ★エラーメッセージ内容については要検討★
          this.errMsg = "book_idの取得に失敗しました";
          console.log(e);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    // 書籍削除処理
    deleteBook: function () {
      this.delErrMsg = "";
      this.isLoading = true;

      // bookIdのチェック
      if (this.delBookId === "") {
        this.isLoading = false;
        this.delErrMsg = "book idを選択してください";
        return;
      }

      AjaxUtil.deleteBook(delBookId)
        .then(() => {
          // ★削除成功ダイアログ？削除メッセージ？★
          this.msg = "削除に成功しました";
        })
        .catch((e) => {
          console.log(e);
          // ★メッセージは要検討★
          this.errMsg = "削除に失敗しました";
        })
        .finally(() => {
          this.isLoading = false;
          // 削除モーダルを閉じる
          
        });
    }
  },
};
</script>
