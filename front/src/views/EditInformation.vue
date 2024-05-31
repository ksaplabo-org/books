<template>
    <div class="editinformation">
        <NaviMenu/>

        <div id="wrapper">
            <Menu/>

            <div id="content-wrapper" class="bg-light">
                
                <div class="container-fluid">

                    <!-- パンくずリスト -->
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link tag="a" :to="{ name: 'top'}">トップページ</router-link>
                        </li>
                        <li class="breadcrumb-item active">お知らせ管理</li>
                    </ol>

                    <hr>
                    <!--エラーメッセージ表示用-->
                    <p class="text-primary" v-show="msg">{{ msg }}</p>
                    <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

                    <!--お知らせが一覧で表示されるカード-->
                    <div class="card shadow mb-4" style="width: auto;">
                        <form @submit.stop.prevent="menu">
                            <div class="card-header">
                                <h3 class="d-flex justify-content-between"><!-- タグ内の要素を両端揃えにする -->
                                    <div>お知らせ一覧</div>
                                    <b-button variant="primary" v-on:click="" data-toggle="modal" data-target="#newInfo">
                                        新規登録
                                    </b-button>
                                </h3>
                            </div>
                            <div class="card-body">
                                <b-table striped responsive hover :items="items" :fields="fields"><!-- テーブルを取得 -->
                                    <!-- ボタンセル定義 -->
                                    <template #cell(controls)="data"><!-- テーブルのcontrolsに与える値 -->
                                        <b-button variant="outline-primary" v-on:click="clickedRow = {no: data.item.no, date: data.item.date, title: data.item.title, text: data.item.content};" 
                                        data-toggle="modal" data-target="#editInfo">
                                            編集
                                        </b-button>
                                        <b-button variant="outline-danger"v-on:click="clickedRow = {no: data.item.no, date: data.item.date, title: data.item.title, text: data.item.content};" 
                                        data-toggle="modal" data-target="#delInfo">
                                            削除
                                        </b-button>
                                    </template>
                                </b-table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>  
        <!-- 新規登録のModal -->
        <div class="modal fade" id="newInfo" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="newInfoLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="newInfoLabel">以下の内容でお知らせを登録してよろしいですか？</div>
                    </div>
                    
                    <form @submit.stop.prevent="addInformation" method="post">

                        <div class="modal-body">
                            <p class="text-danger" v-show="errMsg_Modal">{{ errMsg_Modal }}</p>
                            <div class="d-flex justify-content-between">
                                <label for="title" class="form-label">お知らせ</label>
                                <textarea class="form-control" style="width: 350px;" id="title" v-model="title" rows="2"></textarea>
                            </div>
                            <p></p>
                            <div class="d-flex justify-content-between">
                                <label for="content" class="form-label">詳細</label>
                                <textarea class="form-control" style="width: 350px;" id="content" v-model="content" rows="2"></textarea>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">登録</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="close_new" v-on:click="resetModal">閉じる</button>
                        </div>

                    </form>
                    
                </div>
            </div>
        </div>
        <!-- お知らせ更新のModal -->
        <div class="modal fade" id="editInfo" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="editInfoLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="editInfoLabel">以下の内容でお知らせを更新してよろしいですか？</div>
                    </div>
                    
                    <form @submit.stop.prevent="updateInformation" method="put">

                        <div class="modal-body">
                            <p class="text-danger" v-show="errMsg_Modal">{{ errMsg_Modal }}</p>
                            <div id="NO" class="d-flex justify-content-between">
                                <div class="col-3">
                                    ID
                                </div>
                                <div class="col-9" v-show="clickedRow.no">
                                    {{clickedRow.no}}
                                </div>
                            </div>
                            <p></p>
                            <div id="DATE" class="d-flex justify-content-between">
                                <div class="col-3">
                                    掲載日
                                </div>
                                <div class="col-9" v-show="clickedRow.date">
                                    {{clickedRow.date}}
                                </div>
                            </div>
                            <p></p>
                            <div class="d-flex justify-content-between">
                                <div class="col-3">
                                    <label for="title" class="form-label">お知らせ</label>
                                </div>
                                <div class="col-9">
                                    <textarea class="form-control" style="width: 320px;" id="title" v-model="clickedRow.title" rows="2">
                                    </textarea>
                                </div>
                            </div>
                            <p></p>
                            <div class="d-flex justify-content-between">
                                <div class="col-3">
                                    <label for="content" class="form-label">詳細</label>
                                </div>
                                <div class="col-9">
                                    <textarea class="form-control" style="width: 320px;" id="content" v-model="clickedRow.text" rows="2">
                                    </textarea>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">更新</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="close_edit" v-on:click="resetErr">閉じる</button>
                        </div>

                    </form>
                    
                </div>
            </div>
        </div>
        <!-- お知らせ削除のModal -->
        <div class="modal fade" id="delInfo" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="delInfoLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="delInfoLabel">以下のお知らせを削除してよろしいですか？</div>
                    </div>
                    
                    <form @submit.stop.prevent="deleteInformation" method="remove">

                        <div class="modal-body">
                            <div id="NO" class="d-flex justify-content-between">
                                <div class="col-3">
                                    ID
                                </div>
                                <div class="col-9" v-show="clickedRow.no">
                                    {{clickedRow.no}}
                                </div>
                            </div>
                            <p></p>
                            <div id="DATE" class="d-flex justify-content-between">
                                <div class="col-3">
                                    掲載日
                                </div>
                                <div class="col-9" v-show="clickedRow.date">
                                    {{clickedRow.date}}
                                </div>
                            </div>
                            <p></p>
                            <div class="d-flex justify-content-between">
                                <div class="col-3">
                                    <label for="title" class="form-label">お知らせ</label>
                                </div>
                                <div class="col-9" v-show="clickedRow.title">
                                    {{clickedRow.title}}
                                </div>
                            </div>
                            <p></p>
                            <div class="d-flex justify-content-between">
                                <div class="col-3">
                                    <label for="content" class="form-label">詳細</label>
                                </div>
                                <div class="col-9" v-show="clickedRow.text">
                                    {{clickedRow.text}}
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="submit" class="btn btn-danger">削除</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="close_delete">閉じる</button>
                        </div>

                    </form>
                    
                </div>
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
// 共通
import NaviMenu from '../components/NaviMenu.vue';
import '../utils/sb-admin';
import Menu from '../components/Menu.vue';
import Footer from '../components/Footer.vue';
import Loading from '../components/Loading.vue';

export default {
    name: 'EditInformation',
    props: ['flashMsg', 'flashErrMsg'],    
    components: { NaviMenu, Menu, Footer, Loading },
    data() {
        return {
            msg: '',
            errMsg: '',
            errMsg_Modal: '',
            fields: [
                {key: 'no', label: 'ID'},
                {key: 'date', label: '掲載日'},
                {key: 'title', label: 'お知らせ'},
                {key: 'controls', label: ''}
            ],
            no:'',
            date:'',
            title:'',
            content:'',
            clickedRow: {},
            items: [], 
            isLoading: false
        };
    },
    async mounted() {// サインインチェック
        try {
            if (UserUtil.isSignIn()) {
                this.msg = '';
                this.errMsg = this.flashErrMsg;
                this.updateView();
            } else {
                this.$router.push({ name: 'signin', params: {flashMsg: 'サインインしてください' }});
            };
        } catch(e) {
            this.errMsg = e.message;
        }
    },

    methods: {
        addInformation: async function() {
            this.isLoading = true
            
            if(!this.title){
                this.errMsg_Modal = 'お知らせを入力してください';
                return;
            }
            if (this.title.length > 100) {
                this.errMsg_Modal = 'お知らせは100桁以下で入力してください';
                return;
            }
            if(!this.content){
                this.errMsg_Modal = '詳細を入力してください';
                return;
            }
            if (this.content.length > 100) {
                this.errMsg_Modal = '詳細は100桁以下で入力してください';
                return;
            }
            try {
                // 引数格納
                const model = {
                    date: this.date,
                    title: this.title,
                    content: this.content
                }
                // お知らせ追加
            
                await AjaxUtil.postInformation(model);
                // 画面更新
                this.updateView();
                this.msg = 'お知らせ情報の登録に成功しました';

            } catch (e) {
                this.updateView();
                this.msg = '';
                this.errMsg = 'お知らせ情報の登録に失敗しました';
                console.log(e)
            } finally {
                this.isLoading = false;
            }
        },
        updateInformation: async function() {
            this.isLoading = true
            
            if(!this.clickedRow.title){
                this.errMsg_Modal = 'お知らせを入力してください';
                return;
            }
            if (this.clickedRow.title.length > 100) {
                this.errMsg_Modal = 'お知らせは100桁以下で入力してください';
                return;
            }
            if(!this.clickedRow.text){
                this.errMsg_Modal = '詳細を入力してください';
                return;
            }
            if (this.clickedRow.text.length > 100) {
                this.errMsg_Modal = '詳細は100桁以下で入力してください';
                return;
            }
            try {
                // 引数格納
                const model = {
                    no: this.clickedRow.no,
                    date: this.clickedRow.date,
                    title: this.clickedRow.title,
                    content: this.clickedRow.text
                }
                // お知らせ更新
                await AjaxUtil.putInformation(model);
                // 画面更新
                this.updateView();
                this.msg = 'お知らせ情報の更新に成功しました';
            } catch (e) {
                this.updateView();
                this.msg = '';
                this.errMsg = 'お知らせ情報の更新に失敗しました';
                console.log(e)
            } finally {
                this.isLoading = false;
            }
        },
        deleteInformation: async function() {
            this.isLoading = true
            try {
                // 引数格納
                const model = {
                    no: this.clickedRow.no,
                    date: this.clickedRow.date
                }
                // お知らせ更新
                await AjaxUtil.deleteInformation(model);
                // 画面更新
                this.updateView();
                this.msg = 'お知らせ情報の削除に成功しました';
            } catch (e) {
                this.updateView();
                this.msg = '';
                this.errMsg = 'お知らせ情報の削除に失敗しました';
                console.log(e)
            } finally {
                this.isLoading = false;
            }
        },
        // 画面更新
        updateView: async function() {
            this.msg = '';
            this.errMsg = '';

        // お知らせ取得
            this.getInformation();
        // モーダルを閉じる
            this.closeModal();
        },
        // モーダル閉じる処理
        closeModal: function(){
            const closeModalButtonNew = document.getElementById('close_new');
            closeModalButtonNew.click();
            const closeModalButtonEdit = document.getElementById('close_edit');
            closeModalButtonEdit.click();
            const closeModalButtonDelete = document.getElementById('close_delete');
            closeModalButtonDelete.click();
        },
        // モーダルリセット処理
        resetModal: function(){
            this.title='';
            this.content='';
            this.errMsg_Modal ='';
        },
        resetErr: function(){
            this.errMsg_Modal ='';
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
            })
        }
    }
}

</script>
