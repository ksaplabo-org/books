<template>
  <div class="menu">
    <NaviMenu/>

    <div id="wrapper">
      <Menu/>

      <div id="content-wrapper" class="menu bg-light">
          <div class="container-fluid">
                    <!-- パンくずリスト -->
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link tag="a" :to="{ name: 'top'}">トップページ</router-link>
                        </li>
                        <li class="breadcrumb-item active">お知らせ管理</li>
                    </ol>
            <p class="text-primary" v-show="msg">{{ msg }}</p>
            <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

            <!--お知らせ表示欄ヘッダー-->
            <div class="card shadow mb-4">
              <div class="card-header">
                <div class="col-auto">
                  <div class="row">
                    <div class="d-flex p-2"  style="font-weight:bold">
                      お知らせ一覧
                    </div>
                    <div class="ml-auto">
                      <b-button variant="primary" v-on:click="clickedRow = { title: data.item.title, text: data.item.content, no: data.item.no, date: data.item.no };" data-toggle="modal" data-target="#CreateModal">
                          新規登録
                      </b-button>
                    </div>
                  </div>
                </div>
              </div>
            <!--お知らせ表示欄-->
              <form @submit.stop.prevent="menu">
                <div class="card-body">
                  <b-table striped responsive hover :items="items" :fields="fields">
                   <!--ボタン定義-->
                   <template #cell(controls)="data">
                      <b-button-group>
                            <b-button variant="outline-primary" v-on:click="clickedRow = { title: data.item.title, text: data.item.content, no: data.item.no, date: data.item.date };" data-toggle="modal" data-target="#EditModal">
                              編集
                            </b-button>
                            <b-button variant="outline-danger" v-on:click="clickedRow = { title: data.item.title, text: data.item.content, no: data.item.no, date: data.item.date };" data-toggle="modal" data-target="#deleteConfirmModal" >
                              削除
                             </b-button>
                      </b-button-group>
                    </template>
                  </b-table>
                </div>
              </form>
            </div>

            <!-- 新規登録モーダル -->
            <div class="modal fade" id="CreateModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                      <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="myModalLabel">
                        以下の内容でお知らせを登録してよろしいですか？
                      </div>
                    </div>

                    <div class="modal-body">
                      <p class="text-danger" v-show="modalerrMsg">
                        {{ modalerrMsg }}
                      </p>
                      <div class="row">
                        <div class="col-lg-3">
                          <div class="mt-3">
                            お知らせ
                          </div>
                        </div>
                        <div class="col">
                          <label for="title" class="form-label">
                          </label>
                          <textarea class="form-control" id="title" v-model="title" rows="2">
                          </textarea>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-3">
                          <div class="mt-3">
                          詳細
                          </div>
                        </div>
                        <div class="col">
                          <label for="content" class="form-label">
                          </label>
                          <textarea class="form-control" id="content" v-model="content" rows="2">
                          </textarea>
                        </div>
                      </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" v-on:click="addInformation()">
                          登録
                        </button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="title= ''; content= ''; modalerrMsg=''" >
                          閉じる
                        </button>
                    </div>
                </div>
              </div>
            </div>
            <!-- 編集モーダル -->
            <div class="modal fade" id="EditModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="myModalLabel">
                      以下の内容でお知らせを更新してよろしいですか？
                    </div>
                  </div>

                  <div class="modal-body">
                    <p class="text-danger" v-show="modalerrMsg">
                      {{ modalerrMsg }}
                    </p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div class="mt-3">
                          ID
                        </div>
                      </div>
                      <div class="col">
                        <div class="mt-3" v-show="clickedRow">
                          {{ clickedRow.no }}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <div class="mt-3" v-show="clickedRow">
                          掲載日
                        </div>
                      </div>
                      <div class="col">
                        <div class="mt-3" v-show="clickedRow">
                          {{ clickedRow.date }}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <div class="mt-3">
                          お知らせ
                        </div>
                      </div>
                      <div class="col">
                        <label for="title" class="form-label">
                        </label>
                        <textarea class="form-control" id="title" v-model="clickedRow.title" rows="2">
                        </textarea>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <div class="mt-3">
                          詳細
                        </div>
                      </div>
                      <div class="col">
                        <label for="content" class="form-label">
                        </label>
                        <textarea class="form-control" id="content"  v-model="clickedRow.text" rows="2">
                        </textarea>
                      </div>
                    </div>
                  </div>
                      
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" v-on:click="updateInformation()">
                      更新
                    </button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="modalerrMsg=''">
                      閉じる
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- 削除モーダル -->
            <div class="modal fade" id="deleteConfirmModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="myModalLabel">
                      以下のお知らせを削除してよろしいですか？
                    </div>
                  </div>

                  <div class="modal-body">
                    <div class="row">
                      <div class="col-lg-3">
                        <div class="mt-3" >
                          ID
                        </div>
                      </div>
                      <div class="col">
                        <div class="mt-3" v-show="clickedRow">
                          {{ clickedRow.no }}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <div class="mt-3">
                          掲載日
                        </div>
                      </div>
                      <div class="col">
                        <div class="mt-3" v-show="clickedRow">
                          {{ clickedRow.date }}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <div class="mt-3">
                          お知らせ
                        </div>
                      </div>
                      <div class="col">
                        <div class="mt-3" v-show="clickedRow">
                          {{ clickedRow.title }}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <div class="mt-3">
                          詳細
                        </div>
                      </div>
                      <div class="col">
                        <div class="mt-3" v-show="clickedRow">
                          {{ clickedRow.text }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" v-on:click="removeInformation()">
                      削除
                    </button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                      閉じる
                    </button>
                  </div>
                </div>
              </div>
            </div>
                  
          </div>
        <Footer/>
      </div>
    </div>

    <!-- スクロールトップボタン -->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>
    <!-- ローディングマスク -->
    <loading v-if="isLoading === true"/>
    
  </div>
</template>
    
<script>
import * as UserUtil from '@/utils/UserUtil';
import * as AjaxUtil from '@/utils/AjaxUtil';
import UserConst from '@/utils/const/UserConst';
// 共通
import NaviMenu from '../components/NaviMenu.vue';
import '../utils/sb-admin';
import Menu from '../components/Menu.vue';
import Footer from '../components/Footer.vue';
import Loading from '../components/Loading.vue';

export default {
    name : 'EditInformation',
    props: ['flashMsg', 'flashErrMsg'],    
    components: { NaviMenu, Menu, Footer, Loading },
    data() {
    return {
      msg: this.flashMsg,
      errMsg: '',
      modalerrMsg: '',
      isLoading: false,
      date: '',
      title: '',
      content: '',
      clickedRow: {},
      fields: [
        {key: 'no', label: 'ID'},
        {key: 'date', label: '掲載日'},
        {key: 'title', label: 'お知らせ'},
        {key: 'controls',label: ''},
      ],
      items: []
    };
  },
    async mounted() {
        try {
            // サインイン確認
            if (UserUtil.isSignIn()) {
                // 画面更新
                this.updateView();

                // メッセージ設定
                this.msg = this.flashMsg;
                this.errMsg = this.flashErrMsg;
            } else {
               this.$router.push({ name: 'signin', params: { flashMsg: 'サインインしてください' }});
            };
        } catch(e) {
            this.errMsg = e.message;
        }
    },

    methods: {
    // 画面更新
    updateView: async function() {
      this.msg = '';
      this.errMsg = '';
      // お知らせ取得
      this.getInformation();
    },
    // お知らせ取得処理
    getInformation: function() {
      this.isLoading = true;
      this.items = [];

       AjaxUtil.getInformation()
        .then((response) => {
          this.items = JSON.parse(response.data.Items);
        })
        .catch((e) => {
          this.msg = '';
          this.errMsg = '検索処理に失敗しました';
          console.log(e);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    
    //新規登録
    addInformation: function(){
    this.isLoading = true;

        // お知らせ必須入力チェック
        if(!this.title){
          this.modalerrMsg = "お知らせを入力してください";
          return;
        }
        // お知らせ桁数チェック
        if(this.title.length > 100){
          this.modalerrMsg = "お知らせは100桁以下で入力してください";
          return;
        }
        // 詳細必須入力チェック
        if(!this.content){
          this.modalerrMsg = "詳細を入力してください";
          return;
        }
        // 詳細桁数チェック
        if(this.content.length > 100){
          this.modalerrMsg = "詳細は100桁以下で入力してください";
          return;
        }

        const model = {
          no : this.no,
          date: this.date,
          title: this.title,
          content: this.content
        }
       AjaxUtil.postInformation(model)
        .then((response) => {
          this.updateView();
          this.msg = 'お知らせ情報の登録に成功しました';
          this.errMsg = '';
          $('#CreateModal').modal('hide')
          this.content = '';
          this.title = '';
          this.modalerrMsg = '';
        })
        .catch((e) => {
          this.updateView();
          this.msg = '';
          this.errMsg = 'お知らせ情報の登録に失敗しました';
          $('#CreateModal').modal('hide')
          this.content = '';
          this.title = '';
          this.modalerrMsg = '';
          console.log(e);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    //お知らせ更新
    updateInformation: function(){
    this.isLoading = true;

        // お知らせ必須入力チェック
        if(!this.clickedRow.title){
          this.modalerrMsg = "お知らせを入力してください";
          return;
        }
        // お知らせ桁数チェック
        if(this.clickedRow.title.length > 100){
          this.modalerrMsg = "お知らせは100桁以下で入力してください";
          return;
        }
        // 詳細必須入力チェック
        if(!this.clickedRow.text){
          this.modalerrMsg = "詳細を入力してください";
          return;
        }
        // 詳細桁数チェック
        if(this.clickedRow.text > 100){
          this.modalerrMsg = "詳細は100桁以下で入力してください";
          return;
        }

        const model = {
          no : this.clickedRow.no,
          date: this.clickedRow.date,
          title: this.clickedRow.title,
          content: this.clickedRow.text
        } 
       AjaxUtil.putInformation(model)
        .then((response) => {
          this.updateView();
          this.msg = 'お知らせ情報の更新に成功しました';
          this.errMsg = '';
          $('#EditModal').modal('hide')
          this.modalerrMsg = '';
        })
        .catch((e) => {
          this.updateView();
          this.msg = '';
          this.errMsg = 'お知らせ情報の更新に失敗しました';
          $('#EditModal').modal('hide')
          this.modalerrMsg = '';
          console.log(e);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
     //お知らせ削除
      removeInformation: function(){
      this.isLoading = true;

        const model = {
          no : this.clickedRow.no,
          date: this.clickedRow.date
        }  
      AjaxUtil.deleteInformation(model)
        .then((response) => {
          this.updateView();
          this.msg = 'お知らせ情報の削除に成功しました';
          this.errMsg = '';
          $('#deleteConfirmModal').modal('hide')
        })
        .catch((e) => {
          this.updateView();
          this.msg = '';
          this.errMsg = 'お知らせ情報の削除に失敗しました';
          $('#deleteConfirmModal').modal('hide')
          console.log(e);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
}
</script>
