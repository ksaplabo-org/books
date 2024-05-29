<template>
    <div class="editInformation">
        <NaviMenu/>

        <div id="wrapper">
            <Menu/>

            <div id="content-wrapper" class="bg-light">
                <div class="container-fluid">

                    <!-- パンくずリスト-->
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link tag="a" :to="{ name: 'top'}">トップページ</router-link>
                        </li>
                        <li class="breadcrumb-item active">お知らせ管理</li>
                    </ol>
    
                    <p class="text-primary" v-show="msg">{{ msg }}</p>
                    <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

                    <!-- お知らせ欄 -->
                    <div class="card shadow mb-4">
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <!-- お知らせ一覧タイトル -->
                            <div class="font-weight-bold">お知らせ一覧</div>
                            <!-- 新規登録ボタン -->
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addmodal">
                            新規登録
                            </button>
                        </div>
                        <!-- お知らせ一覧テーブル -->
                        <form @submit.stop.prevent="editInformation">
                        <div class="card-body">
                            <b-table striped responsive hover :items="items" :fields="fields">
                                <!-- ボタンセル定義 -->
                                <template #cell(controls)="data">
                                    <!-- 編集ボタン -->
                                    <b-button variant="outline-primary" v-on:click="informationTitle = data.item.title, informationContent = data.item.content, informationNumber = data.item.no, informationDate = data.item.date"
                                    data-toggle="modal" data-target="#updatemodal">
                                    編集
                                    </b-button>
                                    <!-- 削除ボタン -->
                                    <b-button variant="outline-danger" v-on:click="informationTitle = data.item.title, informationContent = data.item.content, informationNumber = data.item.no, informationDate = data.item.date"
                                    data-toggle="modal" data-target="#deletemodal">
                                    削除
                                    </b-button>
                                </template>
                            </b-table>
                        </div>
                        </form>
                    </div>
                </div>                
            <Footer/>
            </div>
            
            <!-- 新規登録ボタン押下時モーダル -->
            <div class="modal fade" id="addmodal" tabindex="-1" role="dialog" aria-labelledby="addmpleModallLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <form @submit.stop.prevent="addInformation" method="post">
                        <!-- 登録処理タイトル -->
                        <div class="modal-header">
                            <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="addmpleModallLabel">以下の内容でお知らせを登録してよろしいですか？</div>
                        </div>
                        <!-- 登録内容入力欄 -->
                        <div class="modal-body">
                            <p class="text-danger" v-show="errMsg_Modal">{{ errMsg_Modal }}</p>
                            <div class="row pb-3">
                                <div class="col-3 col-form-label">お知らせ</div>
                                <div class="col-9">
                                    <textarea id="informationTitle" class="form-control" v-model="informationTitle" autocomplete="off"></textarea>
                                </div>
                            </div>
                            <div class="row pb-3">
                                <div class="col-3 col-form-label">詳細</div>
                                <div class="col-9">
                                    <textarea id="informationContent" class="form-control" v-model="informationContent" autocomplete="off"></textarea>
                                </div>
                            </div>
                        </div>
                        <!-- フッター -->
                        <div class="modal-footer">
                            <button class="btn btn-primary">登録</button>
                            <button type="button" class="btn btn-secondary" id="addmodalCloseButton" data-dismiss="modal" v-on:click="informationTitle = '',informationContent = '',errMsg_Modal = ''">閉じる</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            <!-- 新規登録ボタン押下時モーダル終了 -->

            <!-- 編集ボタン押下時モーダル -->
            <div class="modal fade" id="updatemodal" tabindex="-1" role="dialog" aria-labelledby="updatemodallLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <form @submit.stop.prevent="updateInformation" method="post">
                        <!-- 登録処理タイトル -->
                        <div class="modal-header">
                            <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="updatemodallLabel">以下の内容でお知らせを更新してよろしいですか？</div>
                        </div>
                        <!-- 登録内容編集欄 -->
                        <div class="modal-body">
                            <p class="text-danger" v-show="errMsg_Modal">{{ errMsg_Modal }}</p>
                            <div class="row pb-3">
                                <div class="col-3 col-form-label">ID</div>
                                <div id="informationNumber" class="col-9 col-form-label">{{ informationNumber }}</div>
                            </div>
                            <div class="row pb-3">
                                <div class="col-3 col-form-label">掲載日</div>
                                <div id="informationDate" class="col-9 col-form-label">{{ informationDate }}</div>
                            </div>
                            <div class="row pb-3">
                                <div class="col-3 col-form-label">お知らせ</div>
                                <div class="col-9">
                                    <textarea id="informationTitle" class="form-control" v-model="informationTitle" autocomplete="off"></textarea>
                                </div>
                            </div>
                            <div class="row pb-3">
                                <div class="col-3 col-form-label">詳細</div>
                                <div class="col-9">
                                    <textarea id="informationContent" class="form-control" v-model="informationContent" autocomplete="off"></textarea>
                                </div>
                            </div>
                        </div>
                        <!-- フッター -->
                        <div class="modal-footer">
                            <button class="btn btn-primary">更新</button>
                            <button type="button" class="btn btn-secondary" id="updatemodalCloseButton" data-dismiss="modal" v-on:click="informationTitle = '',informationContent = '',informationNumber = '',informationDate = '', errMsg_Modal = ''">閉じる</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            <!-- 編集ボタン押下時モーダル終了 -->

            <!-- 削除ボタン押下時モーダル -->
            <div class="modal fade" id="deletemodal" tabindex="-1" role="dialog" aria-labelledby="deletemodallLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <!-- 登録処理タイトル -->
                        <div class="modal-header">
                            <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="updatemodallLabel">以下のお知らせを削除してよろしいですか？</div>
                        </div>
                        <!-- 登録内容確認欄 -->
                        <div class="modal-body">
                            <div class="row pb-3">
                                <div class="col-3 col-form-label">ID</div>
                                <div id="informationNumber" class="col-9 col-form-label">{{ informationNumber }}</div>
                            </div>
                            <div class="row pb-3">
                                <div class="col-3 col-form-label">掲載日</div>
                                <div id="informationDate" class="col-9 col-form-label">{{ informationDate }}</div>
                            </div>
                            <div class="row pb-3">
                                <div class="col-3 col-form-label">お知らせ</div>
                                <div id="informationTitle" class="col-9 col-form-label">{{informationTitle}}</div>
                            </div>
                            <div class="row pb-3">
                                <div class="col-3 col-form-label">詳細</div>
                                <div id="informationContent" class="col-9 col-form-label">{{informationContent}}</div>
                            </div>
                        </div>
                        <!-- フッター -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" v-on:click="deleteInformation">削除</button>
                            <button type="button" class="btn btn-secondary" id="deletemodalCloseButton" data-dismiss="modal" v-on:click="informationTitle = '',informationContent = '',informationNumber = '',informationDate = '', errMsg_Modal = ''">閉じる</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 削除ボタン押下時モーダル終了 -->

        </div>

        <!-- スクロールトップボタン-->
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
        return{
            msg: '',
            errMsg: '',
            errMsg_Modal: '',
            isLoading: false,
            fields: [
                {key: 'no', label: 'ID'},
                {key: 'date', label: '掲載日'},
                {key: 'title', label: 'お知らせ'},
                {key: 'controls', label : ''}
            ],
            items: [],

            // 各項目初期値
            informationNumber:'',
            informationDate:'',
            informationTitle:'',
            informationContent:''
        };
    },
    async mounted() {
        try {
            /*サインイン確認*/
            if (UserUtil.isSignIn()) {
                /* 画面更新*/
                this.updateView();
            } else {
                this.$router.push({ name: 'signin', params: { flashMsg: 'サインインしてください' }});
            };
        }catch (e){
            this.errMsg = e.message;
        }
    },
    methods: {
        updateView: function() {
            this.msg = '';
            this.errMsg = '';

            /*お知らせ情報検索処理*/
            this.getAllInfomation();
        },
        getAllInfomation: function() {
            this.isLoading = true;
            this.items = []; 

            // お知らせ情報取得処理
            AjaxUtil.getInformation()
                .then((response) => {
                    this.items = JSON.parse(response.data.Items);
                })
                .catch((e) => {
                    this.msg = '';
                    this.errMsg = 'お知らせ取得処理に失敗しました';
                    console.log(e);
                })
                .finally(() => {
                    this.isLoading = false;
                }
            );
        },
        addInformation: function() {
            this.msg = '';
            this.errMsg = '';

            //入力チェック
            if (!this.informationTitle){
                this.errMsg_Modal = 'お知らせを入力してください';
                return;
            }
            if (this.informationTitle.length > 100){
                this.errMsg_Modal = 'お知らせは100桁以下で入力してください';
                return;
            }
            if (!this.informationContent){
                this.errMsg_Modal = '詳細を入力してください';
                return;
            }
            if (this.informationContent.length > 100){
                this.errMsg_Modal = '詳細は100桁以下で入力してください';
                return;
            }

            const model = {
                title: this.informationTitle,
                content: this.informationContent
            }

            this.isLoading = true;
            
            //新規登録処理
            AjaxUtil.postInformation(model)
                .then(() => {
                    this.updateView();
                    this.msg = 'お知らせ情報の登録に成功しました';
                })
                .catch((e) => {
                    this.errMsg = 'お知らせ情報の登録に失敗しました';
                    console.log(e);
                })
                .finally(() => {
                    //モーダルを閉じる
                    document.getElementById('addmodalCloseButton').click( function(){
                        document.getElementById('addmodal').modal('hide');
                    });
                    this.isLoading = false;
                }
            );
            
        },
        updateInformation : function() {            
            this.msg = '';
            this.errMsg = '';

            //入力チェック
            if (!this.informationTitle){
                this.errMsg_Modal = 'お知らせを入力してください';
                return;
            }
            if (this.informationTitle.length > 100){
                this.errMsg_Modal = 'お知らせは100桁以下で入力してください';
                return;
            }

            if (!this.informationContent){
                this.errMsg_Modal = '詳細を入力してください';
                return;
            }
            if (this.informationContent.length > 100){
                this.errMsg_Modal = '詳細は100桁以下で入力してください';
                return;
            }

            const model = {
                no: this.informationNumber,
                date: this.informationDate,
                title: this.informationTitle,
                content: this.informationContent
            }

            this.isLoading = true;

            //更新処理
            AjaxUtil.putInformation(model)
                .then(() => {
                    this.updateView();
                    this.msg = 'お知らせ情報の更新に成功しました';
                })
                .catch((e) => {
                    this.errMsg = 'お知らせ情報の更新に失敗しました';
                    console.log(e);
                })
                .finally(() => {
                    //モーダルを閉じる
                    document.getElementById('updatemodalCloseButton').click( function(){
                        document.getElementById('updatemodal').modal('hide');
                    });
                    this.isLoading = false;
                }
            );
        },
        deleteInformation : function() {
            this.isLoading = true;
            this.msg = '';
            this.errMsg = '';

            //削除処理
            AjaxUtil.deleteInformation(this.informationNumber,this.informationDate)
                .then(() => {
                    this.updateView();
                    this.msg = 'お知らせ情報の削除に成功しました';
                })
                .catch((e) => {
                    this.errMsg = 'お知らせ情報の削除に失敗しました';
                    console.log(e);
                })
                .finally(() => {
                    //モーダルを閉じる
                    document.getElementById('deletemodalCloseButton').click( function(){
                        document.getElementById('deletemodal').modal('hide');
                    });
                    this.isLoading = false;
                }
            );
        }
    }
}
</script>